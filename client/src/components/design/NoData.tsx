import React from "react";
import styles from "../../css/design/NoData.module.scss";

type Props = {};

const NoData = ({}: Props) => {
	return (
		<div className={styles.NoData}>
			<h1>NOTHING FOUND: WRONG URL, MAYBE?</h1>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default NoData;
