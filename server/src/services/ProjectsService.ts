import { Pool, QueryResult, QueryResultRow } from "pg";

export interface ProjectLinks {
	site: string;
	github: string;
}
export interface ProjectSource {
	srcSet: string;
	media?: string;
	type?: string;
}

export interface ProjectDB {
	project_id: number;
	title: string;
	description: string;
	alt: string;
	list_of_tech: string[];
	fallback_img_src: string;
	source_list: ProjectSource[];
	is_active: boolean;
	links: ProjectLinks;
}

export interface ProjectClient {
	id: number;
	title: string;
	desc: string;
	alt: string;
	sourceList: ProjectSource[];
	listOfTech: string[];
	links?: { site: string; github: string };
	fallbackImgSrc: string;
}

class ProjectsService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getProjects(): Promise<ProjectDB[] | unknown> {
		try {
			const query = `SELECT * FROM projects`;
			const results = (await this.#db.query(query)) as QueryResult;
			const projects = results.rows as ProjectDB[];
			return projects;
		} catch (error) {
			return error;
		}
	}
	async getProjectByID(id: number) {
		// do stuff
	}
}

export { ProjectsService };
