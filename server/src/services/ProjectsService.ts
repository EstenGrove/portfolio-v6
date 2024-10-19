import { Pool, QueryResult } from "pg";
import { ProjectDB, ProjectInfoDB } from "./types";

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
	async getProjectByID(id: number): Promise<ProjectDB | unknown> {
		try {
			const query = `SELECT * FROM projects WHERE project_id = $1`;
			const results = (await this.#db.query(query, [id])) as QueryResult;
			const project = results?.rows?.[0] as ProjectDB;
			return project;
		} catch (error) {
			return error;
		}
	}
	async getProjectInfoByID(id: number): Promise<ProjectInfoDB | unknown> {
		try {
			const query = `SELECT * FROM project_info WHERE project_id = $1`;
			const results = (await this.#db.query(query, [id])) as QueryResult;
			const project = results?.rows?.[0] as ProjectInfoDB;
			return project;
		} catch (error) {
			return error;
		}
	}
}

export { ProjectsService };
