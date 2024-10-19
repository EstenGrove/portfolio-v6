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

export interface ProjectInfoDB {
	pid: number;
	project_id: number;
	about: string[];
	usecases: string[] | null;
	insights: string[] | null;
	is_active: boolean;
	created_date: string;
}

export interface ProjectInfoClient {
	pid: number;
	projectID: number;
	about: string[];
	usecases: string[] | null;
	insights: string[] | null;
	isActive: boolean;
	createdDate: string;
}
