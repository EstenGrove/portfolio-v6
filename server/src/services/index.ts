import { ProjectsService } from "./ProjectsService";
import { AnalyticsService } from "./AnalyticsService";
import db from "../db/postgres/db";

const projectsService: ProjectsService = new ProjectsService(db);
const analyticsService: AnalyticsService = new AnalyticsService(db);

export { projectsService, analyticsService };
