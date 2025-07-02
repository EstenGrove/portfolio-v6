import styles from "../css/pages/HomePage.module.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
	selectIsLoadingProjects,
	selectProjects,
} from "../features/projects/projectsSlice";
import { fetchProjects } from "../features/projects/operations";
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
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import { Project } from "../features/projects/types";
import { fetchWithAuth } from "../utils/utils_http";

const getImage = async (name: string = "PROJECT-Converty.webp") => {
	const url = "http://172.21.66.16:4000/assets/images/" + name;

	try {
		const request = (await fetchWithAuth(url)) as Response;
		const response = await request.text();
		console.log("request", request);
		console.log("response", response);
		return response;
	} catch (error) {
		console.log("error", error);
		return error;
	}
};

// getImage();

const HomePage = () => {
	const { data, isLoading } = useGetProjectsQuery();
	const projects = data as Project[];
	console.log("data", data);

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
