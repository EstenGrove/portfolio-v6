import { Context, Hono } from "hono";
import { projectsService } from "../../services";
import {
	ProjectDB,
	ProjectInfoClient,
	ProjectInfoDB,
} from "../../services/types";
import {
	normalizeProjectInfo,
	normalizeProjects,
} from "../../utils/utils_data";
import { getResponseError, getResponseOk } from "../../utils/utils_http";
import { getProjectDetails } from "../../modules/projects/getProjectDetails";

const app: Hono = new Hono();

// /projects
app.get("/", async (ctx: Context) => {
	const dbProjects = (await projectsService.getProjects()) as ProjectDB[];
	// convert to client format
	const projects = normalizeProjects(dbProjects);

	const resp = getResponseOk({
		projects: projects,
	});

	return ctx.json(resp);
});

// /projects/:id
app.get("/:projectID", async (ctx: Context) => {
	const id = ctx.req.param("projectID");
	const projectID = Number(id);

	const details = await getProjectDetails(projectID);

	if (details instanceof Error) {
		const errResp = getResponseError(details, {
			project: null,
			info: null,
		});
		return ctx.json(errResp);
	}

	const resp = getResponseOk(details);

	return ctx.json(resp);
});

export default app;
