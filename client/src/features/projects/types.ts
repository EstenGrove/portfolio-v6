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
	links?: ProjectUrls;
}
