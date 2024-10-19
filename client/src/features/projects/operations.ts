import { createAsyncThunk } from "@reduxjs/toolkit";
import { currentEnv, projects } from "../../utils/utils_env";
import { fetchWithAuth } from "../../utils/utils_http";
import { IResponse } from "../types";
import { Project, ProjectInfo } from "./types";

type ProjectsResp = IResponse<{ Projects: Project[] }>;
type ProjectInfoResp = IResponse<{ Info: ProjectInfo }>;

const fetchProjectsList = async (): Promise<Project[] | unknown> => {
	const url = currentEnv.base + projects.getAllProjects;

	try {
		const request = (await fetchWithAuth(url)) as Response;
		const response = (await request.json()) as ProjectsResp;

		return response.Data.Projects;
	} catch (error) {
		return error;
	}
};

const fetchProjectDetails = async (projectID: number) => {
	let url = currentEnv.base + projects.getProjectInfo;
	url += "/" + projectID;

	try {
		const request = (await fetchWithAuth(url)) as Response;
		const response = (await request.json()) as ProjectInfoResp;
		return response.Data.Info;
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
