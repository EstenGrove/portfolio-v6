import React from "react";
import styles from "../../css/layout/Footer.module.scss";

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
