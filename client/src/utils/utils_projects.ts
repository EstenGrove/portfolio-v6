import { PictureSource } from "../features/projects/types";

// Inject the env baseURL into our image path
const baseUrl: string = import.meta.env.VITE_APP_ASSETS_BASE as string;
const getProjectSrcList = (sourceList: PictureSource[]) => {
	if (!sourceList || !sourceList.length) return [];
	return [...sourceList].map((entry: PictureSource) => {
		const { srcSet } = entry;
		return {
			...entry,
			srcSet: baseUrl + srcSet,
		};
	});
};

export { getProjectSrcList };
