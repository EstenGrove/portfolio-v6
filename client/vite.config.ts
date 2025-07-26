import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			additionalData: `
	// 			@use "./src/sass/_custom.scss" as c;
	// 			@use "./src/sass/_mixins.scss" as m;
	// 			@use "./src/sass/_variables.scss" as v;
	// 			`,
	// 		},
	// 	},
	// },
	build: {
		outDir: "./dist",
		emptyOutDir: true,
	},
	server: {
		host: true,
		port: 5178,
	},
});
