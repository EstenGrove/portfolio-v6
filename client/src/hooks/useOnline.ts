import { useSyncExternalStore } from "react";

type EventCallback = (e: Event) => void;

type StoreCallback = (onStoreChange: () => void) => () => void;

const subscriber = (callback: EventCallback) => {
	window.addEventListener("online", callback);
	window.addEventListener("offline", callback);

	return () => {
		window.removeEventListener("online", callback);
		window.removeEventListener("offline", callback);
	};
};

const getSnapshot = (): boolean => {
	return navigator.onLine;
};

const useOnline = (): boolean => {
	const isOnline = useSyncExternalStore(
		subscriber as StoreCallback,
		getSnapshot
	);

	return isOnline;
};

export { useOnline };
