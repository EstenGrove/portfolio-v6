import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import projectsReducer from "../features/projects/projectsSlice";

const store = configureStore({
	reducer: {
		projects: projectsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Properly typed 'useSelector(RootState)' hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ALWAYS USE THIS VIA: const dispatch = useAppDispatch();
export const useAppDispatch: () => AppDispatch = useDispatch;

export { store };
