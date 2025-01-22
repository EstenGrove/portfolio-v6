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

const app: Hono = new Hono();

app.get("/projects", async (ctx: Context) => {
	const dbProjects = (await projectsService.getProjects()) as ProjectDB[];
	// convert to client format
	const projects = normalizeProjects(dbProjects);

	const resp = getResponseOk({
		Projects: projects,
	});

	return ctx.json(resp);
});

app.get("/projects/:projectID", async (ctx: Context) => {
	const projectID = ctx.req.param("projectID");
	console.log("projectID", projectID);
	const infoDB = (await projectsService.getProjectInfoByID(
		Number(projectID)
	)) as ProjectInfoDB;

	if (infoDB instanceof Error) {
		const errResp = getResponseError(infoDB, {
			Info: {},
		});
		return ctx.json(errResp);
	}

	const projectInfo = normalizeProjectInfo(infoDB) as ProjectInfoClient;

	console.log("projectInfo", projectInfo);

	const resp = getResponseOk({
		Info: projectInfo,
	});

	return ctx.json(resp);
});

export default app;
