import styles from "../../css/projects/ProjectsList.module.scss";
import ProjectsItem from "./ProjectsItem";
import { Project } from "../../features/projects/types";
import { useContext } from "react";
import { WindowSizeContext } from "../../context/WindowSizeContext";
import { NavLink } from "react-router-dom";

type Props = {
	projects: Project[];
};

const ProjectsList = ({ projects }: Props) => {
	const windowSize = useContext(WindowSizeContext);
	const hasProjects = !!projects && projects.length > 0;

	return (
		<div className={styles.ProjectsList}>
			<ul className={styles.ProjectsList_listContainer}>
				{hasProjects &&
					projects.map((project) => (
						<ProjectsItem
							key={project.id}
							project={project}
							windowSize={windowSize}
						/>
					))}
			</ul>
			<div className={styles.ProjectsList_viewMore}>
				<NavLink to="/projects" className={styles.ProjectsList_viewMore_link}>
					View More {">"}
				</NavLink>
			</div>
		</div>
	);
};

export default ProjectsList;
