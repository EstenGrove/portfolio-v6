import React, { ReactNode } from "react";
import styles from "../../css/home/Timeline.module.scss";

type Props = {
	children?: ReactNode;
};

const Timeline = ({ children }: Props) => {
	return (
		<div data-timeline="timeline" className={styles.Timeline}>
			<div className={styles.Timeline_items}>{children}</div>
		</div>
	);
};

export default Timeline;

Timeline.defaultProps = {};

Timeline.propTypes = {};
