import styles from "../../css/layout/ParaWithHighlight.module.scss";
import { renderTextWithHighlights } from "../../utils/utils_text";

type TPara = {
	text: string;
	highlights: string[];
};
// To support multiple keywords/highlights
// Accepts list of words & generates a regex for each of the keywords & generates the markup for the highlights using '<b data-text="keyword">keyword</b>
const ParaWithHighlight = ({ text, highlights }: TPara) => {
	return (
		<span
			className={styles.ParaWithHighlight}
			dangerouslySetInnerHTML={{
				__html: renderTextWithHighlights(text, highlights),
			}}
		></span>
	);
};
export default ParaWithHighlight;
