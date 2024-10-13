import { Theme } from "../context/ThemeContext";

// execute media query & fire optional callback on match
const queryMedia = (queryStr: string) => {
	if (window.matchMedia) {
		// results of media query
		const matches = window.matchMedia(queryStr)?.matches;
		return matches;
	} else {
		// un-supported or otherwise unknown
		return false;
	}
};

const setThemeToBody = (theme: Theme) => {
	document.documentElement.dataset.theme = theme;
};

const setPreferredTheme = () => {
	const preference = getPreferredTheme();
	setThemeToBody(preference);
};

const getPreferredTheme = (): Theme => {
	const darkQuery = "(prefers-color-scheme: dark)";
	const prefersDark = queryMedia(darkQuery);

	if (prefersDark) {
		return "dark";
	} else {
		return "light";
	}
};

export { setThemeToBody, setPreferredTheme, getPreferredTheme };
