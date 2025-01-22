import styles from "../css/pages/ProjectPage.module.scss";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { WindowSize } from "../hooks/useWindowSize";
import { WindowSizeContext } from "../context/WindowSizeContext";
import { Project, ProjectInfo } from "../features/projects/types";
import {
	selectCurrentProject,
	selectCurrentProjectInfo,
	selectIsLoadingProjects,
	selectProjects,
	setSelectedProjectByID,
} from "../features/projects/projectsSlice";
import {
	fetchProjectInfo,
	fetchProjects,
} from "../features/projects/operations";
import ProjectsPageHeader from "../components/projects/ProjectsPageHeader";
import Page from "../components/layout/Page";
import Divider from "../components/layout/Divider";
import PageSection from "../components/layout/PageSection";
import PageLayout from "../components/layout/PageLayout";
import FloatingNav from "../components/layout/FloatingNav";
import ProjectInfoContent from "../components/projects/ProjectInfo";

// REQUIREMENTS:
// - "about this project." section (eg a paragraph description)
// - "usecases.": the intention, idea or origin of the project's conception
// - "insights": various things learned while building it, possibly with code samples

const areProjectsHydrated = (projects: Project[]): boolean => {
	return projects && projects?.length >= 1;
};

type ContentProps = {
	selectedProject: Project;
	selectedProjectInfo?: ProjectInfo;
	windowSize: WindowSize;
	isLoading: boolean;
};

const ProjectContent = ({
	selectedProject,
	selectedProjectInfo,
	windowSize,
	isLoading,
}: ContentProps) => {
	if (isLoading) {
		return <PageLayout>Loading...</PageLayout>;
	}

	if (!selectedProject) {
		return <PageLayout>No data found</PageLayout>;
	}

	return (
		<PageLayout>
			<ProjectsPageHeader
				project={selectedProject as Project}
				windowSize={windowSize}
			/>
			<Divider styles={{ margin: "10rem 0 5rem 0" }} />

			<PageSection title="project info">
				{selectedProjectInfo && (
					<ProjectInfoContent projectInfo={selectedProjectInfo} />
				)}
			</PageSection>
		</PageLayout>
	);
};

const ProjectPage = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const windowSize = useContext(WindowSizeContext);
	const projectID: number = Number(params.id) || -1;
	const projects = useAppSelector(selectProjects);
	const selectedProject = useAppSelector(selectCurrentProject);
	const projectInfo = useAppSelector(selectCurrentProjectInfo);
	const isLoading = useAppSelector(selectIsLoadingProjects);

	// load project from url path: '/projects/:id'
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		// if we don't have projects, fetch 'em, then set the current project from the url path
		if (!projects || projects?.length <= 0) {
			dispatch(fetchProjects()).then(() => {
				dispatch(setSelectedProjectByID({ projectID }));
				// fetch projectInfo
				dispatch(fetchProjectInfo(projectID));
			});
		}

		// when we DO have 'projects', but haven't loaded the 'selectedProject' yet
		if (projectID && areProjectsHydrated(projects as Project[])) {
			dispatch(setSelectedProjectByID({ projectID }));
		}

		return () => {
			isMounted = false;
		};
	}, [dispatch, projectID, projects, selectedProject]);

	console.log("selectedProject", selectedProject);
	console.log("projectInfo", projectInfo);

	return (
		<Page>
			<FloatingNav />
			<div className={styles.ProjectPage}>
				<ProjectContent
					isLoading={isLoading}
					selectedProject={selectedProject as Project}
					selectedProjectInfo={projectInfo as ProjectInfo}
					windowSize={windowSize}
				/>
			</div>
		</Page>
	);
};

export default ProjectPage;
