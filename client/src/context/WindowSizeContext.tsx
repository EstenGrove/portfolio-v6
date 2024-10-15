import { createContext, ReactNode } from "react";
import { useWindowSize, WindowSize } from "../hooks/useWindowSize";

const initialSize: WindowSize = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const WindowSizeContext = createContext<WindowSize>(initialSize);

type Props = {
	children?: ReactNode;
};
const WindowSizeProvider = ({ children }: Props) => {
	const windowSize = useWindowSize();

	return (
		<WindowSizeContext.Provider value={windowSize}>
			{children}
		</WindowSizeContext.Provider>
	);
};

export { WindowSizeContext, WindowSizeProvider };
