import styles from "../css/pages/ProjectPage.module.scss";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { WindowSize } from "../hooks/useWindowSize";
import { WindowSizeContext } from "../context/WindowSizeContext";
import {
	Project,
	ProjectDetails,
	ProjectInfo,
} from "../features/projects/types";
import ProjectsPageHeader from "../components/projects/ProjectsPageHeader";
import Page from "../components/layout/Page";
import Divider from "../components/layout/Divider";
import PageSection from "../components/layout/PageSection";
import PageLayout from "../components/layout/PageLayout";
import FloatingNav from "../components/layout/FloatingNav";
import ProjectInfoContent from "../components/projects/ProjectInfo";
import { useGetProjectQuery } from "../features/projects/projectsApi";
import { useProjectDetails } from "../hooks/useProjectDetails";

// REQUIREMENTS:
// - "about this project." section (eg a paragraph description)
// - "usecases.": the intention, idea or origin of the project's conception
// - "insights": various things learned while building it, possibly with code samples

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
	console.log("selectedProject", selectedProject);
	if (isLoading) {
		return (
			<PageLayout>
				<span style={{ color: "#fff" }}>Loading...</span>
			</PageLayout>
		);
	}

	if (!selectedProject) {
		return (
			<PageLayout>
				<span style={{ color: "#fff" }}>No data found</span>
			</PageLayout>
		);
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
	const windowSize = useContext(WindowSizeContext);
	const projectID: number = Number(params.id) || -1;
	const { data, isLoading } = useProjectDetails(projectID);
	const details = data as ProjectDetails;
	const project = details?.project;
	const info = details?.info;
	console.log("data", data);

	return (
		<Page>
			<FloatingNav />
			<div className={styles.ProjectPage}>
				{!isLoading && !!project && (
					<ProjectContent
						isLoading={isLoading}
						selectedProject={project as Project}
						selectedProjectInfo={info as ProjectInfo}
						windowSize={windowSize}
					/>
				)}
			</div>
		</Page>
	);
};

export default ProjectPage;
