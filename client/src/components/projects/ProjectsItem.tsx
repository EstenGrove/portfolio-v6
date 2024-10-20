import { useMemo, useRef } from "react";
import styles from "../../css/projects/ProjectsItem.module.scss";
import sprite from "../../assets/icons/portfolio.svg";
import { PictureSource, Project } from "../../features/projects/types";
import { addEllipsis } from "../../utils/utils_text";
import Picture from "../shared/Picture";
import GoToProject from "./GoToProject";
import { getProjectSrcList } from "../../utils/utils_projects";
import {
	IObserverOptions,
	useIntersectionObserver,
} from "../../hooks/useIntersectionObserver";

type Props = {
	project: Project;
	windowSize: {
		width: number;
		height: number;
	};
};

type IconLinkProps = {
	link: string;
};

const IconLink = ({ link }: IconLinkProps) => {
	return (
		<a
			href={link}
			target="_blank"
			rel="noreferrer noopener"
			className={styles.IconLink}
		>
			<svg className={styles.IconLink_icon}>
				<use xlinkHref={`${sprite}#icon-github`}></use>
			</svg>
		</a>
	);
};

type BadgeProps = {
	text: string;
};
const Badge = ({ text }: BadgeProps) => {
	return <li className={styles.Badge}>{text}</li>;
};
type BadgeListProps = {
	list: string[];
};
const BadgesList = ({ list }: BadgeListProps) => {
	return (
		<div className={styles.BadgesList}>
			<ul className={styles.BadgesList_list}>
				{list && list.map((badge) => <Badge key={badge} text={badge} />)}
			</ul>
		</div>
	);
};

// REQUIREMENTS:
// - Consider creating a rotated image of each project's image
// 		- Rotated around -45degs so it goes from lower-left to upper-right w/ a matching background perhaps

const settings: IObserverOptions = {
	root: null,
	rootMargin: "0px",
	threshold: 0.3,
};

const ProjectsItem = ({ project, windowSize }: Props) => {
	const cardRef = useRef<HTMLLIElement>(null);
	const imgDims = windowSize?.width <= 1030 ? "100%" : 350;
	const sourceList: PictureSource[] = getProjectSrcList(project.sourceList);
	const { entry } = useIntersectionObserver(cardRef, { settings });
	const isIntersecting = useMemo(() => {
		return entry.isIntersecting;
	}, [entry]);

	return (
		<li
			ref={cardRef}
			className={styles.ProjectsItem}
			style={{ display: isIntersecting ? "visible" : "hidden" }}
		>
			<div className={styles.ProjectsItem_img}>
				<div className={styles.ProjectsItem_img_mask}></div>
				<Picture
					width={imgDims}
					height={imgDims}
					alt={project.alt || project.desc}
					sourceList={sourceList}
					fallbackSrc={project.fallbackImgSrc}
					loading="lazy"
				/>
			</div>
			<div className={styles.ProjectsItem_info}>
				<h6 className={styles.ProjectsItem_info_title}>{project.title}</h6>
				<p className={styles.ProjectsItem_info_desc}>{project.desc}</p>
				<BadgesList list={project.listOfTech} />

				<div className={styles.ProjectsItem_info_links}>
					<IconLink link={project?.links?.github || ""} />
					<GoToProject to={`/projects/${project?.id}`}>
						View {addEllipsis(project.title, 20)}
					</GoToProject>
				</div>
			</div>
		</li>
	);
};

export default ProjectsItem;
