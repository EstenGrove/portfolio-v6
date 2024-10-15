import { Project } from "../../features/projects/types";
import styles from "../../css/projects/ProjectsPageHeader.module.scss";
import Picture from "../shared/Picture";
import BadgesList from "../shared/BadgesList";
import Title from "../shared/Title";

type Props = {
	project: Project;
};

const ProjectsPageHeader = ({ project }: Props) => {
	return (
		<header className={styles.ProjectsPageHeader}>
			<div className={styles.ProjectsPageHeader_info}>
				<Title title={project?.title} styles={{ margin: "0 0" }} />
				<h4 className={styles.ProjectsPageHeader_info_subtitle}>
					{project?.desc}
				</h4>
				<br />
				<BadgesList list={project?.listOfTech} size="SM" />
			</div>
			<div className={styles.ProjectsPageHeader_img}>
				<Picture
					width={880}
					height={400}
					alt={project?.alt}
					sourceList={project?.sourceList}
					fallbackSrc={project?.fallbackImgSrc}
				/>
			</div>
		</header>
	);
};

export default ProjectsPageHeader;
