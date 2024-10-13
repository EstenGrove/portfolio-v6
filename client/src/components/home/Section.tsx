import { ReactNode } from "react";
import styles from "../../css/home/Section.module.scss";

type Props = {
	title: string;
	children?: ReactNode;
};

const Section = ({ title, children }: Props) => {
	return (
		<section className={styles.Section}>
			<h2 className={styles.Section_title}>
				{title}
				<b>.</b>
			</h2>
			<div className={styles.Section_inner}>{children}</div>
		</section>
	);
};

export default Section;
