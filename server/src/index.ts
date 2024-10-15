import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { logger } from "hono/logger";
import { authConfig } from "./configs/authConfig";
import { serveStatic } from "hono/serve-static";
import projectRoutes from "./routes/projects/projectRoutes";
import { projectsService } from "./services";
import { cors } from "hono/cors";

const app = new Hono();
const port = 3000 || process.env.PORT;

const corsConfig = {
	origin: ["http://localhost", "localhost", "http:192.168.0.48"],
	allowHeaders: "*",
	allowMethods: ["POST", "GET", "OPTIONS"],
};
app.use(
	"*",
	cors({
		origin: ["http://localhost", "localhost", "http:192.168.0.48"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		maxAge: 36000,
	})
);
app.use("*", logger());
// app.use("*", basicAuth(authConfig));

// ##TODOS:
// - DEFINE ROUTES
// - DEFINE STATIC FILE SERVER FOR IMAGES & OTHER FILES
// app

// app.use("/assets/images/*", serveStatic({ root: "./images" }));

app.get("/ping", (c) => {
	return c.json({
		Timestamp: Date.now(),
		Message: "[PING]: Success!",
	});
});

app.route("/", projectRoutes);

console.log(`✅ Server is running on port ${port}`);
serve({
	fetch: app.fetch,
	port,
});
