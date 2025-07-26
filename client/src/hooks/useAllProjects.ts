import { useGetProjectsQuery } from "../features/projects/projectsApi";
import { Project } from "../features/projects/types";

const useAllProjects = () => {
	const { data, isLoading, refetch } = useGetProjectsQuery();
	const projects = data as Project[];

	return {
		data: projects,
		isLoading: isLoading,
		refetch: refetch,
	};
};

export { useAllProjects };
