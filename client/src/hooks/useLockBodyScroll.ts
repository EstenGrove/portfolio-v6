import { useLayoutEffect } from "react";

const useLockBodyScroll = () => {
	useLayoutEffect(() => {
		const originStyles = window.getComputedStyle(document.body).overflow;

		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = originStyles;
		};
	}, []);
};

export { useLockBodyScroll };
