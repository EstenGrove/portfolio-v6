import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Project } from "./types";
import { TStatus } from "../types";
import { RootState } from "../../store/store";
import { fetchProjects } from "./operations";

export interface ProjectsSlice {
	projects: Project[];
	selectedProject: Project | null;
	status: TStatus;
}

const initialState: ProjectsSlice = {
	projects: [],
	selectedProject: null,
	status: "IDLE",
};

const projectsSlice = createSlice({
	name: "projects",
	initialState: initialState,
	reducers: {
		setSelectedProject(state: ProjectsSlice, action: PayloadAction<Project>) {
			state.selectedProject = action.payload;
		},
		resetSelectedProject(state: ProjectsSlice) {
			state.selectedProject = null;
		},
	},
	extraReducers(builder) {
		// fetch projects thunk
		builder
			.addCase(fetchProjects.pending, (state: ProjectsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				fetchProjects.fulfilled,
				(state: ProjectsSlice, action: PayloadAction<Project[]>) => {
					state.status = "FULFILLED";
					state.projects = action.payload;
				}
			);
	},
});

export const { setSelectedProject, resetSelectedProject } =
	projectsSlice.actions;

export const selectCurrentProject = (state: RootState): Project | null => {
	return state.projects.selectedProject;
};
export const selectProjects = (state: RootState): Project[] => {
	return state.projects.projects as Project[];
};
export const selectIsLoadingProjects = (state: RootState): boolean => {
	return state.projects.status === "PENDING";
};

export default projectsSlice.reducer;
