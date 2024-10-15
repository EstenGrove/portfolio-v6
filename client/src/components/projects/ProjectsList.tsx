import styles from "../../css/projects/ProjectsList.module.scss";
import ProjectsItem from "./ProjectsItem";
import { Project } from "../../features/projects/types";
import { useContext } from "react";
import { WindowSizeContext } from "../../context/WindowSizeContext";

type Props = {
	projects: Project[];
};

const ProjectsList = ({ projects }: Props) => {
	const windowSize = useContext(WindowSizeContext);

	return (
		<div className={styles.ProjectsList}>
			<ul className={styles.ProjectsList_listContainer}>
				{!!projects &&
					projects.length > 0 &&
					projects.map((project) => (
						<ProjectsItem
							key={project.id}
							project={project}
							windowSize={windowSize}
						/>
					))}
			</ul>
		</div>
	);
};

export default ProjectsList;
