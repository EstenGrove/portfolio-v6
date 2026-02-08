import Page from "../components/layout/Page";
import PageLayout from "../components/layout/PageLayout";
import ParaWithHighlight from "../components/layout/ParaWithHighlight";
import Title from "../components/layout/Title";
import styles from "../css/pages/AboutPage.module.scss";
import { aboutPage } from "../data/aboutPage";

const AboutPage = () => {
	return (
		<Page>
			<PageLayout>
				<div className={styles.AboutPage}>
					<Title title="about me" />
					<div className={styles.AboutPage_content}>
						{Object.keys(aboutPage).map((key, idx) => (
							<div
								key={`${key}-${idx}`}
								className={styles.AboutPage_content_para}
							>
								<ParaWithHighlight
									key={`PARA-${idx + 1}`}
									text={aboutPage[key].text}
									highlights={aboutPage[key].keywords}
								/>
							</div>
						))}
					</div>
				</div>
			</PageLayout>
		</Page>
	);
};

export default AboutPage;
