import styles from "../css/pages/HomePage.module.scss";
import { Project } from "../features/projects/types";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
// components
import Wave from "../components/design/Wave";
import Header from "../components/shared/Header";
import MainHeader from "../components/home/MainHeader";
import Section from "../components/home/Section";
import AboutSection from "../components/home/AboutSection";
import TimelineSection from "../components/home/TimelineSection";
import ProjectsSection from "../components/home/ProjectsSection";
import ContactMeSection from "../components/home/ContactMeSection";
import WaveBackground from "../components/design/WaveBackground";
import GradientBackground from "../components/design/GradientBackground";

const getProjectsPreviewList = (projects: Project[], showCount: number = 5) => {
	if (!projects || !projects.length) return [];
	if (projects.length <= showCount) return projects;

	return projects.slice(0, showCount);
};

const showXProjects = 5;

const HomePage = () => {
	const { data, isLoading } = useGetProjectsQuery();
	const allProjects = data as Project[];
	const projects = getProjectsPreviewList(allProjects, showXProjects);

	return (
		<div className={styles.HomePage}>
			<GradientBackground />
			<Header>
				<MainHeader />
			</Header>
			<Wave fill="var(--bg-body)" style={{ marginTop: "-10rem" }} />
			<Section key="about" title="about">
				<AboutSection />
			</Section>
			<WaveBackground key="about/projects" order={["top", "bottom"]} />
			<Section key="projects" title="projects">
				<ProjectsSection projects={projects} isLoading={isLoading} />
			</Section>
			<WaveBackground key="projects/experience" order={["top", "bottom"]} />
			<Section key="experience" title="experience">
				<TimelineSection />
			</Section>
			<WaveBackground key="experience/contact" order={["top", "bottom"]} />
			<Section title="contact me">
				<ContactMeSection />
			</Section>
		</div>
	);
};

export default HomePage;
