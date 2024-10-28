import Page from "../components/layout/Page";
import Title from "../components/layout/Title";
import styles from "../css/pages/ProjectsPage.module.scss";

const ProjectsPage = () => {
	return (
		<Page>
			<div className={styles.ProjectsPage}>
				<Title title="projects" />
			</div>
		</Page>
	);
};

export default ProjectsPage;
