import { ReactNode } from "react";
import styles from "../../css/layout/PageSection.module.scss";

type Props = {
	title?: string;
	children?: ReactNode;
};

const PageSection = ({ title, children }: Props) => {
	return (
		<section className={styles.PageSection}>
			<h2 className={styles.PageSection_title}>
				{title}
				<b>.</b>
			</h2>
			<div className={styles.PageSection_inner}>{children}</div>
		</section>
	);
};

export default PageSection;
