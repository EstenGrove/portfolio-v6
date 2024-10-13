import styles from "../css/pages/HomePage.module.scss";
import Header from "../components/shared/Header";
import MainHeader from "../components/home/MainHeader";
import GradientBackground from "../components/design/GradientBackground";
import Section from "../components/home/Section";

const HomePage = () => {
	return (
		<div className={styles.HomePage}>
			<GradientBackground />
			<Header>
				<MainHeader />
			</Header>
			<Section title="about">
				{/*  */}
				{/*  */}
			</Section>
		</div>
	);
};

export default HomePage;
