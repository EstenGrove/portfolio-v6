import { ReactNode } from "react";
import styles from "../../css/design/NoData.module.scss";

type Props = {
	children?: ReactNode;
};

const NoData = ({ children }: Props) => {
	return (
		<div className={styles.NoData}>
			<h1>NOTHING FOUND: WRONG URL, MAYBE?</h1>
			{/*  */}
			{children}
		</div>
	);
};

export default NoData;
