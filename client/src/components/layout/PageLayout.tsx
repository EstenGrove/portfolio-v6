import { ReactNode } from "react";
import styles from "../../css/layout/PageLayout.module.scss";

type Props = {
	children?: ReactNode;
};

const PageLayout = ({ children }: Props) => {
	return <div className={styles.PageLayout}>{children}</div>;
};

export default PageLayout;
