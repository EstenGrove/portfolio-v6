import { ReactNode } from "react";
import styles from "../../css/home/TimelineItem.module.scss";

type Props = {
	children?: ReactNode;
};

// DESIGN:
// 1. DOT
// 2. PATH/LINE
// 3. CONTENT

const TimelineItem = ({ children }: Props) => {
	return (
		<div data-timeline="item" className={styles.TimelineItem}>
			{children}
			{/*  */}
		</div>
	);
};

export default TimelineItem;

TimelineItem.defaultProps = {};

TimelineItem.propTypes = {};
