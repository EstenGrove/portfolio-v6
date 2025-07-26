import { PictureSource } from "../features/projects/types";
import { currentEnv } from "./utils_env";

// Inject the env baseURL into our image path
const baseUrl: string = currentEnv.assets;
const getProjectSrcList = (sourceList: PictureSource[]) => {
	if (!sourceList || !sourceList.length) return [];
	return [...sourceList].map((entry: PictureSource) => {
		const { srcSet } = entry;
		// We want to remove the '/assets/' prefix in the srcSet value to prevent it being set as the base path...
		// ...which would remove the '/api/v1' real path
		const cleanSrcSet = srcSet.replace(/^\/+/, "");
		const src = new URL(cleanSrcSet, baseUrl).toString();

		return {
			...entry,
			srcSet: src,
		};
	});
};

export { getProjectSrcList };
