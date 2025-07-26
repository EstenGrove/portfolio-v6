import { projectsService } from "../../services";
import { ProjectAndInfoDB } from "../../services/types";
import { normalizeProject, normalizeProjectInfo } from "../../utils/utils_data";

// Returns project & info
const getProjectDetails = async (projectID: number) => {
	const { project: projectDB, info: infoDB } =
		(await projectsService.getProjectAndInfoByID(
			projectID
		)) as ProjectAndInfoDB;

	const project = normalizeProject(projectDB);
	const info = normalizeProjectInfo(infoDB);

	return {
		project,
		info,
	};
};

export { getProjectDetails };
