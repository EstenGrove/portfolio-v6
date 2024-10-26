import { Pool, QueryResult } from "pg";
import { ProjectAndInfoDB, ProjectDB, ProjectInfoDB } from "./types";

class ProjectsService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getProjects(isActive: boolean = true): Promise<ProjectDB[] | unknown> {
		try {
			const query = `SELECT * FROM projects WHERE is_active = $1`;
			const results = (await this.#db.query(query, [isActive])) as QueryResult;
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
	async getProjectAndInfoByID(id: number): Promise<ProjectAndInfoDB | unknown> {
		try {
			const project = (await this.getProjectByID(id)) as ProjectDB;
			const info = (await this.getProjectInfoByID(id)) as ProjectInfoDB;
			return {
				project,
				info,
			};
		} catch (error) {
			return error;
		}
	}
}

export { ProjectsService };
