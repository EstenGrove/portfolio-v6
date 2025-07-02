import { useGetProjectQuery } from "../features/projects/projectsApi";
import { ProjectDetails } from "../features/projects/types";

const useProjectDetails = (projectID: number) => {
	const shouldFetch = Boolean(projectID);
	const { data, isLoading, refetch } = useGetProjectQuery(projectID, {
		skip: !shouldFetch,
	});
	const details = data as ProjectDetails;

	return {
		data: details,
		isLoading: isLoading,
		refetch: refetch,
	};
};

export { useProjectDetails };
