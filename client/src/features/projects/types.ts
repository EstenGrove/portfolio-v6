export interface PictureSource {
	srcSet: HTMLSourceElement["srcset"];
	media?: HTMLSourceElement["media"];
	type?: HTMLSourceElement["type"];
}

export interface ProjectUrls {
	github: string;
	site?: string;
}

export interface Project {
	id: number;
	title: string;
	desc: string;
	alt: string;
	sourceList: PictureSource[];
	listOfTech: string[];
	links?: ProjectUrls;
	fallbackImgSrc: string;
}

export interface ProjectInfo {
	about: string[];
	usecases: string[];
	insights: string[];
	createdDate: string;
	updatedDate: string | null;
	isActive: true;
}

export interface ProjectDetails {
	project: Project;
	info: ProjectInfo;
}
