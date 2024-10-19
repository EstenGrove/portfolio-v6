import {
	ProjectClient,
	ProjectDB,
	ProjectInfoClient,
	ProjectInfoDB,
} from "../services/types";

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

const normalizeProjectInfo = (
	projectInfo: ProjectInfoDB
): ProjectInfoClient => {
	const client: ProjectInfoClient = {
		pid: projectInfo.pid,
		projectID: projectInfo.project_id,
		about: projectInfo.about || [],
		usecases: projectInfo.usecases || [],
		insights: projectInfo.insights || [],
		isActive: projectInfo.is_active,
		createdDate: projectInfo.created_date,
	};
	return client;
};

export { normalizeProject, normalizeProjects, normalizeProjectInfo };
