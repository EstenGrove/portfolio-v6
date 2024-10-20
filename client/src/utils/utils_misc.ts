// SORTING UTILS
// sorts number ascending order (1-10)
const sortNumAscByKey = <T extends object>(
	key: keyof T,
	list: T[] = []
): T[] => {
	if (!list || !list?.length) return [];
	return [...list].sort((a, b) => {
		return a?.[key as keyof object] - b?.[key as keyof object];
	});
};

// sorts number descending order (10-1)
const sortNumDescByKey = <T extends object>(
	key: keyof T,
	list: T[] = []
): T[] => {
	if (!list || !list?.length) return [];
	return [...list].sort((a, b) => {
		return b?.[key as keyof object] - a?.[key as keyof object];
	});
};

export { sortNumAscByKey, sortNumDescByKey };
