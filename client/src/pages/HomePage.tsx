import styles from "../css/pages/HomePage.module.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
	selectIsLoadingProjects,
	selectProjects,
} from "../features/projects/projectsSlice";
import { fetchProjects } from "../features/projects/operations";
// components
import Header from "../components/shared/Header";
import MainHeader from "../components/home/MainHeader";
import GradientBackground from "../components/design/GradientBackground";
import Section from "../components/home/Section";
import AboutSection from "../components/home/AboutSection";
import TimelineSection from "../components/home/TimelineSection";
import WaveBackground from "../components/design/WaveBackground";
import ProjectsSection from "../components/home/ProjectsSection";
import Wave from "../components/design/Wave";
import MonoWave from "../components/design/MonoWave";

const HomePage = () => {
	const dispatch = useAppDispatch();
	const projects = useAppSelector(selectProjects);
	const isLoading = useAppSelector(selectIsLoadingProjects);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (!projects || projects?.length < 1) {
			dispatch(fetchProjects());
		}

		return () => {
			isMounted = false;
		};
	}, [dispatch, projects]);

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
			<WaveBackground order={["top", "bottom"]} />
			<MonoWave />
			{/* <WaveBackground order={["top", "bottom"]} /> */}
			<Section key="projects" title="projects">
				<ProjectsSection projects={projects} isLoading={isLoading} />
				{/*  */}
			</Section>
			{/* <WaveBackground order={["top", "bottom"]} /> */}
			<Section key="experience" title="experience">
				<TimelineSection />
			</Section>
			{/* <WaveBackground order={["top", "bottom"]} /> */}
			{/* WAVE SEPARATOR HERE...*/}
		</div>
	);
};

export default HomePage;
