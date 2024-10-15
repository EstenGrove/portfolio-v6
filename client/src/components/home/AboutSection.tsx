import styles from "../../css/home/AboutSection.module.scss";
import { aboutText } from "../../data/aboutMe";
import { renderTextWithHighlights } from "../../utils/utils_text";
import GoToLink from "../shared/GoToLink";

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

const AboutSection = () => {
	return (
		<div className={styles.AboutSection}>
			<div className={styles.AboutSection_content}>
				{Object.keys(aboutText).map((key, idx) => (
					<p key={`${key}-${idx}`} className={styles.AboutSection_content_para}>
						<ParaWithHighlight
							key={`PARA-${idx + 1}`}
							text={aboutText[key].text}
							highlights={aboutText[key].keywords}
						/>
					</p>
				))}
				<GoToLink to="/about">Read more about me</GoToLink>
			</div>
		</div>
	);
};

export { ParaWithHighlight };
export default AboutSection;
