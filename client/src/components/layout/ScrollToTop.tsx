import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top of page on route change
 * - Watches the 'location.pathname' property of React Router
 */

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		window.scrollTo(0, 0);

		return () => {
			isMounted = false;
		};
	}, [pathname]);

	return null;
};

export default ScrollToTop;
