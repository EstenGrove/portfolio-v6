import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { basicAuth } from "hono/basic-auth";
import { authConfig } from "./configs/authConfig";
import { serveStatic } from "@hono/node-server/serve-static";
import projectRoutes from "./routes/projects/projectRoutes";
import path from "path";
import { createReadStream } from "fs";
import { Readable } from "stream";

const app = new Hono();
const port = 3000;

const corsConfig = {
	origin: ["http://localhost", "localhost", "http://192.168.0.48"],
	allowMethods: ["POST", "GET", "OPTIONS"],
	maxAge: 36000,
};
// app.use("*", cors(corsConfig));
app.use("*", logger());
// app.use("*", basicAuth(authConfig));

// ##TODOS:
// - DEFINE ROUTES
// - DEFINE STATIC FILE SERVER FOR IMAGES & OTHER FILES
// app

app.use("/assets/images/*", serveStatic());

app.route("/api/v1", projectRoutes);
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

console.log(`✅ Server is running on port ${port}`);
serve({
	fetch: app.fetch,
	port,
});
