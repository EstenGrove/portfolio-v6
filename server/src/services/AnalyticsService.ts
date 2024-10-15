import { Pool, QueryResult, QueryResultRow } from "pg";

export interface VisitorEntry {
	page_route: string; // '/about'
	referrer: string;
	user_agent: string;
	user_ip: string;
	locale: string;
}

class AnalyticsService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async logVisit(visit: VisitorEntry) {
		const { page_route, referrer, user_agent, user_ip, locale } = visit;
		try {
			const query = `
        INSERT INTO visitor_log (page_route, referrer, user_agent, user_ip, locale)
        ($1, $2, $3, $4, $5);
      `;
			const results = await this.#db.query(query, [
				page_route,
				referrer,
				user_agent,
				user_ip,
				locale,
			]);
			return results.rowCount;
		} catch (error) {
			return error;
		}
	}
}

export { AnalyticsService };
