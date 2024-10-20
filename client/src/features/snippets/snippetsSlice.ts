import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { TStatus } from "../types";
// import { RootState } from "../../store/store";

const initialState = {};

const snippetsSlice = createSlice({
	name: "snippets",
	initialState: initialState,
	reducers: {},
});

export default snippetsSlice.reducer;
