import { AboutText } from "./aboutMe";

const emailTag = `<a target="_blank" rel="noreferrer" href="mailto:echo.alchemist.design@gmail.com">reach out!</a>`;

const aboutPage: AboutText = {
	para1: {
		text: `Hi, my name's Steven. I'm a software developer based in Phoenix, Arizona. I've worked as a software developer for nearly a decade now, but I've worked in the tech sector in various roles for much longer. In each of those roles I always made it my goal to leave the product and workplace a little bit better than when I discovered it and I like to think my impact was potent enough to demonstrate those values. `,
		keywords: [`Steven`, `software developer`],
	},
	para2: {
		text: `As a developer I've worked for a variety of companies, each with different markets. But last few years I've been working in a division of healthcare software building out their flagship products and most recently finishing the company's modernized product version. Each place I've worked has had a unique business model & unique demands that required an ever-present requirement for adaptability, which is something I pride myself on. In each of these places the most resonant constant was the predictability of change. Not so much the "if", but the "when". Business requirements will always change & the customer's needs are changing too, often long before the company's goals shift. Which is why I pride myself on my ability to move with the current when needed. But, there are also times when you need to push against the grain a bit when you feel it's the best choice for you, the company and/or the customer.`,
		keywords: [`developer`, `adaptability`, `"if"`, `"when"`],
	},
	para3: {
		text: ``,
		keywords: [],
	},
	para4: {
		text: `When I'm not doing paid work for an employer I do like to spend a good amount of time working with new technologies, learning new patterns and methods to improve my own output as well as expand my skillset. Some of the more recent projects I've built include a custom Snippets Manager for some of my commonly used code snippets across different languages, a real-time web rooms app for running Scrum Poker and a Web Audio Synthesizer w/ custom effects such as Reverb, Delay, Envelope Filters and more. I'm always looking for something interesting to work on. <br/><br/> <i>So, if you've got some work that you think I might be a good fit for, let me know! Or if you just wanna let me know you've enjoyed my website, ${emailTag}</i>`,
		keywords: [
			`Snippets Manager`,
			`Web Audio Synthesizer`,
			`real-time web rooms app`,
		],
	},
};

export { aboutPage };
