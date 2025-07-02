import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { serve } from "@hono/node-server";
import { Context, Hono, Next } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { createReadStream } from "fs";
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

// origin: "http://172.21.66.16:5178",
const corsConfig = {
	origin,
	credentials: true,
};
// Absolute path to /server/assets
// const assetsPath = path.resolve("./assets/images");
const assetsPath = path.resolve("./assets/images");

console.log("assetsPath", assetsPath);

app.use(logger());
app.use(cors(corsConfig));
app.use("/assets/images/*", async (ctx: Context, next: Next) => {
	// const res = await serveStatic({ path: assetsPath })(ctx, next);
	const res = await serveStatic({ path: assetsPath })(ctx, next);
	console.log("res", res);
	console.log("Img Request: ", ctx.req.path);
	if (res && res.ok) {
		res.headers.set("Access-Control-Allow-Origin", origin); // or specific origin
		res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
		res.headers.set("Access-Control-Allow-Headers", "Content-Type");
	}

	return res;
});

app.route("projects", projectRoutes);

app.get("/something/:imageName", async (ctx) => {
	const imageName = ctx.req.param("imageName");
	const ext = path.extname(imageName).replace(/\./, "");
	const filepath = path.join("./assets/images", imageName);
	const readable = createReadStream(filepath);
	const webStream = Readable.toWeb(readable) as ReadableStream;

	const headers = new Headers();
	headers.set("Cache-Control", "public, max-age=604800");
	headers.set("Content-Type", "image/" + ext);
	headers.set("E-Tag", Date.now().toString().slice(-5));

	return new Response(webStream, {
		headers: headers,
	});
});
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
