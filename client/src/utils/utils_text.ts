const escapeRegex = (string: string) => {
	if (!string || string.length <= 0) return string;
	return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
};
const escapeRegexMany = (string: string) => {
	return string.replace(/\\/gm, "");
};

const generateHighlightRegex = (words: string[] = []): RegExp => {
	let mergedWords: string = "";
	if (words.length <= 1) {
		const regex = new RegExp(`(${escapeRegex(words[0])})`, "gmi");
		return regex;
	} else {
		for (let i = 0; i < words.length; i++) {
			const current = words[i];
			if (i === words.length - 1) {
				mergedWords += `${current}`;
			} else {
				mergedWords += `${current}|`;
			}
		}
		const regex = new RegExp(`(${escapeRegexMany(mergedWords)})`, "gmi");
		return regex;
	}
};

// Takes a string of text & regex to match within the text & generates markup to highlight according to the regex
const createHighlightRenders = (text: string, highlightRegex: RegExp) => {
	const replaced = text.replace(highlightRegex, (one) => {
		return `<b data-text="${one}">${one}</b>`;
	});

	return replaced;
};

// Takes a string of text & an array of keywords as string
// - Generates dynamic regex to match each of the keywords
// - Separates the text & wraps the 'highlight' keywords with special markup
// - Then returns the result ready to be rendered as HTML
const renderTextWithHighlights = (text: string, highlights: string[]) => {
	const regex = generateHighlightRegex(highlights);
	const output = createHighlightRenders(text, regex);

	return output;
};

const enforceStrLength = (str: string, maxLength: number): string => {
	if (str?.length <= maxLength) return str;
	const newStr = str.slice(0, maxLength);

	return newStr;
};

const addEllipsis = (str: string, maxLength: number = 30): string => {
	const sliced = enforceStrLength(str, maxLength);
	return `${sliced}...`;
};

export {
	escapeRegex,
	generateHighlightRegex,
	createHighlightRenders,
	renderTextWithHighlights,
	enforceStrLength,
	addEllipsis,
};
