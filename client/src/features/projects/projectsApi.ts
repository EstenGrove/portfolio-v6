import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { currentEnv } from "../../utils/utils_env";
import { fetchProjectDetails, fetchProjectsList } from "./operations";
import { AwaitedResponse } from "../types";
import { Project, ProjectDetails } from "./types";

export const projectsApi = createApi({
	reducerPath: "projectsApi",
	baseQuery: fetchBaseQuery({ baseUrl: currentEnv.base }),
	tagTypes: ["Projects"],
	endpoints: (builder) => ({
		getProjects: builder.query<Project[], void>({
			queryFn: async () => {
				const response = (await fetchProjectsList()) as AwaitedResponse<{
					projects: Project[];
				}>;
				const data = response.Data.projects as Project[];
				return { data };
			},
		}),
		getProject: builder.query<ProjectDetails, number>({
			queryFn: async (projectID: number) => {
				const response = (await fetchProjectDetails(
					projectID
				)) as AwaitedResponse<ProjectDetails>;
				const data = response.Data as ProjectDetails;

				return { data };
			},
		}),
	}),
});

export const { useGetProjectsQuery, useGetProjectQuery } = projectsApi;
