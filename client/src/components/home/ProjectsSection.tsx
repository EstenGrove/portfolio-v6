import styles from "../../css/home/ProjectsSection.module.scss";
import ProjectsList from "../projects/ProjectsList";
import Spinner from "../shared/Spinner";
import { Project } from "../../features/projects/types";
import { sortNumAscByKey } from "../../utils/utils_misc";

const Loading = () => {
	return (
		<div className={styles.Loading}>
			<Spinner />
		</div>
	);
};

type Props = {
	projects: Project[];
	isLoading: boolean;
};
const ProjectsSection = ({ projects, isLoading }: Props) => {
	const sortedProjects = sortNumAscByKey<Project>("id", projects);

	return (
		<div className={styles.ProjectsSection}>
			<h4 className={styles.ProjectsSection_subtitle}>
				Here's a list of selected projects I've built recently:
			</h4>
			<div className={styles.ProjectsSection_list}>
				{isLoading ? <Loading /> : <ProjectsList projects={sortedProjects} />}
			</div>
		</div>
	);
};

export default ProjectsSection;
