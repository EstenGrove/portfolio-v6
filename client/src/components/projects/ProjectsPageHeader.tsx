import { Project } from "../../features/projects/types";
import styles from "../../css/projects/ProjectsPageHeader.module.scss";
import { getProjectSrcList } from "../../utils/utils_projects";
import { WindowSize } from "../../hooks/useWindowSize";
import Picture from "../shared/Picture";
import BadgesList from "./BadgesList";
import Title from "../layout/Title";

type Props = {
	project: Project;
	windowSize: WindowSize;
};

const ProjectsPageHeader = ({ project, windowSize }: Props) => {
	const sourceList = getProjectSrcList(project?.sourceList);
	const height = windowSize.height < 850 ? 250 : 400;

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
					height={height}
					alt={project?.alt}
					sourceList={sourceList}
					fallbackSrc={project?.fallbackImgSrc}
					style={{ borderRadius: "1rem" }}
				/>
			</div>
		</header>
	);
};

export default ProjectsPageHeader;
