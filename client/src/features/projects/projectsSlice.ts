import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectInfo } from "./types";
import { TStatus } from "../types";
import { RootState } from "../../store/store";
import { fetchProjectInfo, fetchProjects } from "./operations";

export interface ProjectsSlice {
	projects: Project[];
	selectedProject: Project | null;
	selectedProjectInfo: ProjectInfo | null;
	status: TStatus;
}

const initialState: ProjectsSlice = {
	projects: [],
	selectedProject: null,
	selectedProjectInfo: null,
	status: "IDLE",
};

const projectsSlice = createSlice({
	name: "projects",
	initialState: initialState,
	reducers: {
		setSelectedProjectByID: (
			state: ProjectsSlice,
			action: PayloadAction<{ projectID: number }>
		) => {
			const projectID = action.payload.projectID;
			const project = state.projects.find((entry) => entry.id === projectID);
			state.selectedProject = project as Project;
		},
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
		builder
			.addCase(fetchProjectInfo.pending, (state: ProjectsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				fetchProjectInfo.fulfilled,
				(state: ProjectsSlice, action: PayloadAction<ProjectInfo>) => {
					state.status = "FULFILLED";
					state.selectedProjectInfo = action.payload;
				}
			);
	},
});

export const {
	setSelectedProject,
	resetSelectedProject,
	setSelectedProjectByID,
} = projectsSlice.actions;

export const selectCurrentProject = (state: RootState): Project | null => {
	return state.projects.selectedProject;
};
export const selectProjects = (state: RootState): Project[] => {
	return state.projects.projects as Project[];
};
export const selectIsLoadingProjects = (state: RootState): boolean => {
	return state.projects.status === "PENDING";
};
export const selectCurrentProjectInfo = (
	state: RootState
): ProjectInfo | null => {
	return state.projects.selectedProjectInfo;
};

export default projectsSlice.reducer;
