import { ReactNode, useState } from "react";
import { createContext } from "react";
import { setThemeToBody, getPreferredTheme } from "../utils/utils_theme";

export type Theme = "light" | "dark" | "other";

export interface ThemeState {
	theme: Theme;
	toggleTheme: () => void;
}

export type ThemeStateContext = ThemeState;

const ThemeContext = createContext({
	theme: "dark" as Theme,
	toggleTheme: () => {},
});

type Props = {
	children?: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState<Theme>(() => {
		const prefTheme = getPreferredTheme();
		// setThemeToBody(prefTheme);
		return prefTheme;
	});

	const toggleTheme = () => {
		if (theme === "light") {
			const target: Theme = "dark";
			setTheme(target);
			setThemeToBody(target);
		} else {
			const target: Theme = "light";
			setTheme(target);
			setThemeToBody(target);
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeProvider };
