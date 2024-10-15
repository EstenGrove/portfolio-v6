import React from "react";
import styles from "../../css/layout/Footer.module.scss";

type Props = {};

const FooterWave = ({ fill = "var(--accent)" }) => {
	return (
		<div className={styles.FooterWave}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill="#7c3aed"
					fillOpacity="1"
					d="M0,224L60,197.3C120,171,240,117,360,96C480,75,600,85,720,101.3C840,117,960,139,1080,133.3C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
				></path>
			</svg>
		</div>
	);
};

const Copyright = () => {
	const year = new Date().getFullYear();
	return <span title="This means nothing lol.">&#169; Copyright {year}</span>;
};

const LegalInfo = () => {
	return (
		<div className={styles.LegalInfo}>
			<Copyright />
			<span>
				All Rights Reserved. <i>sgore.dev</i>
			</span>
		</div>
	);
};

const Footer = () => {
	return (
		<footer className={styles.Footer}>
			<div className={styles.Footer_inner}>
				<LegalInfo />
			</div>
			{/* <FooterWave /> */}
		</footer>
	);
};

export default Footer;
