import { createAsyncThunk } from "@reduxjs/toolkit";
import { currentEnv, projects } from "../../utils/utils_env";
import { fetchWithAuth } from "../../utils/utils_http";
import { IResponse } from "../types";
import { Project } from "./types";

type ProjectsResponse = IResponse<{ Projects: Project[] }>;

const fetchProjectsList = async (): Promise<Project[] | unknown> => {
	const url = currentEnv.base + projects.getAllProjects;

	try {
		const request = (await fetchWithAuth(url)) as Response;
		const response = (await request.json()) as ProjectsResponse;
		return response.Data.Projects;
	} catch (error) {
		return error;
	}
};

const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
	const projects = (await fetchProjectsList()) as Project[];

	return projects;
});

export { fetchProjects };
