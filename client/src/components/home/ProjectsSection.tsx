import styles from "../../css/home/ProjectsSection.module.scss";
import ProjectsList from "../projects/ProjectsList";
import Spinner from "../shared/Spinner";
import { Project } from "../../features/projects/types";

const Loading = () => {
	return (
		<div className={styles.Loading}>
			<Spinner />
		</div>
	);
};

const localCopies = [
	{
		id: 7,
		title: "Portfolio v5",
		desc: "An updated version of my personal developer portfolio built using React, Typescript, Node and PostgreSQL.",
		alt: "Screenshot of Portfolio v5",
		sourceList: [
			{
				type: "image/webp",
				media: "",
				srcSet: "./assets/images/PROJECT-Portfolio-v5.webp",
			},
			{
				type: "image/jpeg",
				media: "",
				srcSet: "./assets/images/PROJECT-Portfolio-v5.jpeg",
			},
		],
		listOfTech: ["React", "Typescript", "Node", "PostgreSQL"],
		links: null,
		fallbackImgSrc: "./assets/images/PROJECT-Portfolio-v5.png",
	},
	{
		id: 6,
		title: "Image Converter CLI in Golang",
		desc: "Image conversion & optimization script that runs as a portable & installable binary built with Golang",
		alt: "Screenshot of Image CLI in Golang",
		sourceList: [
			{
				type: "image/webp",
				media: "",
				srcSet: "./assets/images/PROJECT-ImageConverterCLI-Go.webp",
			},
			{
				type: "image/jpeg",
				media: "",
				srcSet: "./assets/images/PROJECT-ImageConverterCLI-Go.jpeg",
			},
		],
		listOfTech: ["Golang"],
		links: null,
		fallbackImgSrc: "./assets/images/PROJECT-ImageConverterCLI-Go.png",
	},
	{
		id: 4,
		title: "Image Editor/Resizer",
		desc: "Photo editor with support for cropping, resizing, scaling, rotating & applying various filters. Built with React, Typescript and NodeJS using HTML5 Canvas.",
		alt: "Screenshot of Image Editor/Resizer App",
		sourceList: [
			{
				type: "image/webp",
				media: "",
				srcSet: "./assets/images/PROJECT-ImageResizer.webp",
			},
			{
				type: "image/jpeg",
				media: "",
				srcSet: "./assets/images/PROJECT-ImageResizer.jpeg",
			},
		],
		listOfTech: ["React", "Typescript", "Node", "PostgreSQL"],
		links: null,
		fallbackImgSrc: "./assets/images/PROJECT-ImageResizer.png",
	},
	{
		id: 3,
		title: "Snippets Manager",
		desc: "A code snippets manager for entering, editing, and organizing code snippets via tags, labels.",
		alt: "Screenshot of Snippets Manager App",
		sourceList: [
			{
				type: "image/webp",
				media: "",
				srcSet: "./assets/images/PROJECT-SnippetsMgr.webp",
			},
			{
				type: "image/jpeg",
				media: "",
				srcSet: "./assets/images/PROJECT-SnippetsMgr.jpeg",
			},
		],
		listOfTech: ["React", "Typescript", "Node", "PostgreSQL"],
		links: null,
		fallbackImgSrc: "./assets/images/PROJECT-SnippetsMgr.png",
	},
	{
		id: 5,
		title: "Image Converter CLI",
		desc: "Image conversion & optimization script built as an installable CLI using Typescript, NodeJS & leveraging the Sharp library with file streams.",
		alt: "Screenshot of Image Converter/Optimizer CLI",
		sourceList: [
			{
				type: "image/webp",
				media: "",
				srcSet: "./assets/images/PROJECT-ImageConverterCLI.webp",
			},
			{
				type: "image/jpeg",
				media: "",
				srcSet: "./assets/images/PROJECT-ImageConverterCLI.jpeg",
			},
		],
		listOfTech: ["React", "Typescript", "Node", "SCSS"],
		links: null,
		fallbackImgSrc: "./assets/images/PROJECT-ImageConverterCLI.png",
	},
	{
		id: 1,
		title: "Pulley",
		desc: "Custom NodeJS CLI for managing and syncing multiple Git repositories at once.",
		alt: "Screenshot of Pulley",
		sourceList: [
			{
				type: "image/webp",
				media: "",
				srcSet: "./assets/images/PROJECT-PulleyCLI.webp",
			},
			{
				type: "image/jpeg",
				media: "",
				srcSet: "./assets/images/PROJECT-PulleyCLI.jpeg",
			},
		],
		listOfTech: ["Node", "Chalk", "Yeo", "Bash"],
		links: {
			site: null,
			github: "https://github.com/EstenGrove/pulley-cli",
		},
		fallbackImgSrc: "./assets/images/PROJECT-PulleyCLI.png",
	},
	{
		id: 2,
		title: "Synthy",
		desc: "Polyphonic Synthesizer using the Web Audio API built w/ React, Typescript, SCSS and NodeJS.",
		alt: "Screenshot of Synthy",
		sourceList: [
			{
				type: "image/webp",
				media: "",
				srcSet: "/assets/images/PROJECT-Synthy.webp",
			},
			{
				type: "image/jpeg",
				media: "",
				srcSet: "/assets/images/PROJECT-Synthy.jpeg",
			},
		],
		listOfTech: ["React", "Typescript", "Node", "PostgreSQL"],
		links: {
			site: null,
			github: "https://github.com/EstenGrove/Synthy",
		},
		fallbackImgSrc: "./assets/images/PROJECT-Synthy.png",
	},
];

type Props = {
	projects: Project[];
	isLoading: boolean;
};
const ProjectsSection = ({ projects, isLoading }: Props) => {
	return (
		<div className={styles.ProjectsSection}>
			<h4 className={styles.ProjectsSection_subtitle}>
				Here's a list of selected projects I've worked on:
			</h4>
			<div className={styles.ProjectsSection_list}>
				{isLoading ? (
					<Loading />
				) : (
					<ProjectsList projects={projects as Project[]} />
				)}
			</div>
		</div>
	);
};

export default ProjectsSection;
