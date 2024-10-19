// SORTING UTILS
// sorts number ascending order (1-10)
const sortNumAscByKey = (key: string, list: object[] = []): object[] => {
	if (!list || list?.length <= 0) return [];
	return [...list].sort((a, b) => {
		return a?.[key as keyof object] - b?.[key as keyof object];
	});
};
// sorts number descending order (10-1)
const sortNumDescByKey = (key: string, list: object[] = []): object[] => {
	if (!list || list?.length <= 0) return [];
	return [...list].sort((a, b) => {
		return b?.[key as keyof object] - a?.[key as keyof object];
	});
};

export { sortNumAscByKey, sortNumDescByKey };
