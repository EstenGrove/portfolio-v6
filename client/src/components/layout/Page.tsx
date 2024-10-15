import { ReactNode } from "react";
import styles from "../../css/layout/Page.module.scss";

type Props = { children: ReactNode };

const Page = ({ children }: Props) => {
	return <div className={styles.Page}>{children}</div>;
};

export default Page;
