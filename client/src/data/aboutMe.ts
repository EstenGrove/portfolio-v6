type AboutText = {
	[key: string[number]]: {
		text: string;
		keywords: string[] | [];
	};
};

const aboutText: AboutText = {
	para1: {
		text: `My name's Steven. I'm a software developer based in sunny Phoenix, Arizona 🌞. While my passion & primary focus is Front-End development, I've worked across many other areas including Backend, DevOps, Networking & Design.`,
		keywords: ["software developer", "Front-End"],
	},
	para2: {
		text: `I got my start working for a large hosting provider which required learning a fair deal about DNS, server administration, web hosting and site maintenance. This experience opened a curiosity that inspired me to learn to code and I've been working as a developer ever since!`,
		keywords: ["DNS", "server administration"],
	},
	para3: {
		text: `In my off time, I enjoy building fun projects, dabbling and learning new or interesting technologies (hardware & software) and I also enjoy recording/creating music with Logic Pro🎧`,
		keywords: [],
	},
};

const aboutPageText: AboutText = {
	para1: {
		text: `My name's Steven. I'm a software developer based in sunny Phoenix, Arizona 🌞. While my passion & primary focus is Front-End development, I've worked across many other areas including Backend, DevOps, Networking & Design.`,
		keywords: ["software developer", "Front-End"],
	},
	para2: {
		text: `I enjoy building UIs that are easy to use, beautiful and performant. I pride myself on taking ownership over my domain and following through on the achieving the best product for the customer.`,
		keywords: [],
	},
};

export { aboutText, aboutPageText };
