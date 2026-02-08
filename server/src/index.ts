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
const port = Number(process.env.SERVER_PORT || 5000);

const CLIENT = {
	host: process.env.CLIENT_HOST,
	port: Number(process.env.CLIENT_PORT),
};

const SERVER = {
	host: process.env.SERVER_HOST || "0.0.0.0",
	port: Number(process.env.SERVER_PORT),
};

const ORIGIN = {
	prefix: "http://",
	host: CLIENT.host,
	port: CLIENT.port,
};

const origin = ORIGIN.prefix + CLIENT.host + ":" + CLIENT.port;
const altOrigin = ORIGIN.prefix + "localhost" + ":" + CLIENT.port;
// Add IP-based origin for local network access
const ipOrigin = ORIGIN.prefix + "172.21.66.9" + ":" + CLIENT.port;
// Add 127.0.0.1 as well for localhost access
const localhostOrigin = ORIGIN.prefix + "127.0.0.1" + ":" + CLIENT.port;
// Add IP-based origin for backend server (in case frontend uses IP to connect)
const serverIpOrigin = "http://172.21.66.9:" + (SERVER.port || port);

const corsConfig = {
	origin: [origin, altOrigin, ipOrigin, localhostOrigin, serverIpOrigin],
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

console.log(`\n✅ [SERVER] is running at ${SERVER.host}:${SERVER.port}`);
console.log(`\n✅ [CLIENT] is running AT: ${origin}\n`);

serve({
	fetch: app.fetch,
	port: SERVER.port || port,
	hostname: SERVER.host || "0.0.0.0",
});
