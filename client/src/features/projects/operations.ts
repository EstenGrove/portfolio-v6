import { createAsyncThunk } from "@reduxjs/toolkit";
import { currentEnv, projects } from "../../utils/utils_env";
import { fetchWithAuth } from "../../utils/utils_http";
import { Project, ProjectDetails, ProjectInfo } from "./types";
import { AsyncResponse, AwaitedResponse } from "../types";

type ProjectsResp = AsyncResponse<{ projects: Project[] }>;
type ProjectDetailsResp = AsyncResponse<{ details: ProjectDetails }>;

const fetchProjectsList = async (): Promise<Project[] | unknown> => {
	const url = currentEnv.base + projects.getAllProjects;

	try {
		const request = (await fetchWithAuth(url)) as Response;
		const response = (await request.json()) as ProjectsResp;

		return response;
	} catch (error) {
		return error;
	}
};

const fetchProjectDetails = async (projectID: number): ProjectDetailsResp => {
	let url = currentEnv.base + projects.getProjectInfo;
	url += "/" + projectID;

	try {
		const request = (await fetchWithAuth(url)) as Response;
		const response = (await request.json()) as AwaitedResponse<ProjectDetails>;

		return response;
	} catch (error) {
		return error;
	}
};

const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
	const projects = (await fetchProjectsList()) as Project[];

	return projects;
});

const fetchProjectInfo = createAsyncThunk(
	"projects/fetchProjectInfo",
	async (projectID: number) => {
		const projectInfo = (await fetchProjectDetails(projectID)) as ProjectInfo;

		return projectInfo;
	}
);

export {
	// http requests
	fetchProjectsList,
	fetchProjectDetails,
	// async thunks
	fetchProjects,
	fetchProjectInfo,
};
