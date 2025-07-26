/**
 * NOTE: each environment's variables will be defined from it's corresponding .env.* file
 * - 'development': .env.development
 * - 'production': .env.production
 * - 'local': .env.local
 * - 'testing': .env.testing (not really used nor needed.)
 */
const API_AUTH = {
	development: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_PASSWORD,
	},
	production: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_PASSWORD,
	},
	testing: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_PASSWORD,
	},
	local: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_PASSWORD,
	},
} as const;

const CURRENT_ENV_NAME = "local";
const CURRENT_ENV_AUTH = API_AUTH[CURRENT_ENV_NAME];

const API_ENDPOINTS = {
	analytics: {
		logVisit: "/tinyPixel",
	},
	projects: {
		getAllProjects: "/projects",
		getProjectInfo: "/projects",
	},
	snippets: {
		getAllSnippets: "/getSnippets",
	},
};
const { analytics, projects, snippets } = API_ENDPOINTS;

// ##TODO:
// - Un-comment the following line before deploying
// const enableTinyPixel = CURRENT_ENV_NAME !== "local";
const enableTinyPixel = true;

export {
	API_AUTH,
	CURRENT_ENV_AUTH as currentEnv,
	CURRENT_ENV_NAME as currentEnvName,
};

export {
	// feature flag
	enableTinyPixel,
	// endpoints
	API_ENDPOINTS,
	analytics,
	projects,
	snippets,
};
