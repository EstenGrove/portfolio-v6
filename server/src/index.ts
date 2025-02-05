import { serve } from "@hono/node-server";
import { Context, Hono } from "hono";
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
const port = Number(process.env.PORT || 5000);

const corsConfig = {
	origin: [
		"http://localhost:5173",
		"http://localhost:4173",
		"http://192.168.0.48",
		"http://192.168.0.48:5173",
		"192.168.0.48:5173",
		"192.168.0.48",
		"192.168.0.48:*",
	],
	allowMethods: ["POST", "GET", "OPTIONS"],
	maxAge: 36000,
};
// app.use("*", cors(corsConfig));
app.use("*", cors());
app.use("*", logger());
// app.use("*", basicAuth(authConfig));

// ##TODOS:
// - DEFINE ROUTES
// - DEFINE STATIC FILE SERVER FOR IMAGES & OTHER FILES
// app
// Anytime a request to 'assets/images' is received we assume it's for static content
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

app.notFound((ctx: Context) => {
	return ctx.json({
		Message: `404 Page Not Found: ${ctx.req.url}`,
	});
});

console.log(`✅ Server is running on port ${port}`);
serve({
	fetch: app.fetch,
	port,
	hostname: "192.168.0.48",
});
