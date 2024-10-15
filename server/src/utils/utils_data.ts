import { ProjectClient, ProjectDB } from "../services/ProjectsService";

const normalizeProject = (project: ProjectDB): ProjectClient => {
	const client: ProjectClient = {
		id: project.project_id,
		title: project.title,
		desc: project.description,
		alt: project.alt,
		sourceList: project.source_list,
		listOfTech: project.list_of_tech,
		links: project.links,
		fallbackImgSrc: project.fallback_img_src,
	};

	return client;
};

const normalizeProjects = (projects: ProjectDB[]): ProjectClient[] => {
	const clients: ProjectClient[] = projects.map(normalizeProject);

	return clients;
};

export { normalizeProject, normalizeProjects };
