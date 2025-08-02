import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { serve } from "@hono/node-server";
import { Context, Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
// import { serveStatic } from "@hono/node-server/serve-static";
import { createReadStream, ReadStream } from "fs";
import { Readable } from "stream";
import projectRoutes from "./routes/projects/projectRoutes";

const app = new Hono().basePath("/api/v1");
const port = Number(process.env.API_PORT || 5000);

const CLIENT = {
	host: process.env.CLIENT_HOST,
	port: Number(process.env.CLIENT_PORT),
};

const ORIGIN = {
	prefix: "http://",
	host: CLIENT.host,
	port: CLIENT.port,
};

const origin = ORIGIN.prefix + CLIENT.host + ":" + CLIENT.port;
const altOrigin = ORIGIN.prefix + "localhost" + ":" + CLIENT.port;

// origin: "http://172.21.66.16:5178",
const corsConfig = {
	origin: [origin, altOrigin],
	credentials: true,
};
// Absolute path to /server/assets
// const assetsPath = path.resolve(__dirname, "../assets/images");

app.use(logger());
app.use(cors(corsConfig));

// app.use("/assets/images/*", serveStatic({ path: assetsPath }));

app.route("projects", projectRoutes);

app.get("assets/images/:imageName", async (ctx) => {
	const imageName = ctx.req.param("imageName");
	const ext = path.extname(imageName).replace(/\./, "");
	const filepath = path.join("./assets/images", imageName);
	const readable: ReadStream = createReadStream(filepath);
	const webStream = Readable.toWeb(readable) as ReadableStream;

	const headers = new Headers();
	headers.set("Cache-Control", "public, max-age=604800");
	headers.set("Content-Type", "image/" + ext);
	headers.set("E-Tag", Date.now().toString().slice(-5));

	return new Response(webStream, {
		headers: headers,
	});
});
// Test API
app.get("test", async (ctx: Context) => {
	return ctx.text("Hello");
});

app.notFound((ctx: Context) => {
	return ctx.json({
		Message: `404 Page Not Found: ${ctx.req.url}`,
	});
});

console.log(`\n✅ [SERVER] is running on PORT: ${port}`);
console.log(`\n✅ [CLIENT] is running AT: ${origin}\n`);

serve({
	fetch: app.fetch,
	port,
	hostname: "172.21.66.16",
});
