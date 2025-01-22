import { PictureSource } from "../features/projects/types";
import { currentEnv } from "./utils_env";

// Inject the env baseURL into our image path
const baseUrl: string = currentEnv.assets;
const getProjectSrcList = (sourceList: PictureSource[]) => {
	if (!sourceList || !sourceList.length) return [];
	return [...sourceList].map((entry: PictureSource) => {
		const { srcSet } = entry;
		const src = new URL(srcSet, baseUrl).toString();

		return {
			...entry,
			srcSet: src,
		};
	});
};

export { getProjectSrcList };
