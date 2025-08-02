import Page from "../components/layout/Page";
import Title from "../components/layout/Title";
import ProjectsList from "../components/projects/ProjectsList";
import Spinner from "../components/shared/Spinner";
import styles from "../css/pages/ProjectsPage.module.scss";
import { Project } from "../features/projects/types";
import { useAllProjects } from "../hooks/useAllProjects";
import { sortNumAscByKey } from "../utils/utils_misc";

const Loading = () => {
	return (
		<div className={styles.Loading}>
			<Spinner />
		</div>
	);
};

const ProjectsPage = () => {
	const { data, isLoading } = useAllProjects();
	const sortedProjects = sortNumAscByKey<Project>("id", data);

	return (
		<Page>
			<div className={styles.ProjectsPage}>
				<Title title="projects" />

				<div className={styles.ProjectsPage_list}>
					{isLoading ? <Loading /> : <ProjectsList projects={sortedProjects} />}
				</div>
			</div>
		</Page>
	);
};

export default ProjectsPage;
