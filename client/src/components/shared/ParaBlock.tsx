import { ReactNode } from "react";
import styles from "../../css/shared/ParaBlock.module.scss";

type Props = {
	text?: string;
	children?: ReactNode;
};

const ParaBlock = ({ text, children }: Props) => {
	const childs = !text ? children : text;
	return <p className={styles.ParaBlock}>{childs}</p>;
};

export default ParaBlock;
