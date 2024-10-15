import { Context, Hono } from "hono";
import { projectsService } from "../../services";
import { ProjectDB } from "../../services/ProjectsService";
import { normalizeProjects } from "../../utils/utils_data";
import { getResponseOk } from "../../utils/utils_http";

const app: Hono = new Hono();

app.get("/getProjects", async (ctx: Context) => {
	const dbProjects = (await projectsService.getProjects()) as ProjectDB[];
	// convert to client format
	const projects = normalizeProjects(dbProjects);

	const resp = getResponseOk({
		Projects: projects,
	});

	return ctx.json(resp);
});

export default app;
