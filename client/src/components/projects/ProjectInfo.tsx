import { ReactNode } from "react";
import styles from "../../css/projects/ProjectInfo.module.scss";
import type { ProjectInfo } from "../../features/projects/types";
import ParaBlock from "../shared/ParaBlock";
import Divider from "../layout/Divider";

type SectionName = "about" | "usecases" | "insights";

type Props = {
	projectInfo: ProjectInfo;
};

type SubtitleProps = {
	children?: ReactNode;
};

const Subtitle = ({ children }: SubtitleProps) => {
	return (
		<div className={styles.Subtitle}>
			<h3 className={styles.Subtitle_heading}>{children}</h3>
		</div>
	);
};

type SectionProps = {
	name: SectionName;
	section: string[];
	// projectSection?: {
	// 	about: string[];
	// 	usecases: string[];
	// 	insights: string[];
	// };
};
// renders out each sections paragraphs & provides proper spacing etc
const Section = ({ name, section }: SectionProps) => {
	console.log("section", section);

	return (
		<div className={styles.Section}>
			{section &&
				section.map((section, idx) => (
					<>
						<ParaBlock key={`${name}-${idx}`}>{section}</ParaBlock>
						<br />
					</>
				))}
		</div>
	);
};

const ProjectInfo = ({ projectInfo }: Props) => {
	console.log("projectInfo", projectInfo);
	const { about, usecases, insights } = projectInfo;
	const sections = { about, usecases, insights };
	const sectionKeys = Object.keys(sections);
	return (
		<div className={styles.ProjectInfo}>
			{sectionKeys &&
				sectionKeys.map((name, idx) => (
					<>
						<Section
							key={`${idx}-${name}`}
							name={name as SectionName}
							section={sections?.[name as keyof object]}
						/>
						<Divider style={{ margin: "var(--projectInfoSpacing) 0" }} />
					</>
				))}
		</div>
	);
};

export default ProjectInfo;
