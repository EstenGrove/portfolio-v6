import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { WindowSizeProvider } from "./WindowSizeContext";

type Props = {
	children?: ReactNode;
};

const AppProviders = ({ children }: Props) => {
	return (
		<ThemeProvider>
			<WindowSizeProvider>{children}</WindowSizeProvider>
		</ThemeProvider>
	);
};

export { AppProviders };
