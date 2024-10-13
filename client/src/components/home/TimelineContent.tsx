import React, { ReactNode } from "react";
import styles from "../../css/home/TimelineContent.module.scss";

type Props = {
	children?: ReactNode;
};

const TimelineContent = ({ children }: Props) => {
	return (
		<div data-timeline="content" className={styles.TimelineContent}>
			<div className={styles.TimelineContent_content}>{children}</div>
		</div>
	);
};

export default TimelineContent;

TimelineContent.defaultProps = {};

TimelineContent.propTypes = {};
