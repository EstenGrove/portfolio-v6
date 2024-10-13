import React, { ReactNode } from "react";
import styles from "../../css/home/TimelineConnector.module.scss";

type Props = {
	children?: ReactNode;
};

const TimelineConnector = ({ children }: Props) => {
	return (
		<div data-timeline="connector" className={styles.TimelineConnector}>
			<div className={styles.TimelineConnector_inner}>{children}</div>
		</div>
	);
};

export default TimelineConnector;

TimelineConnector.defaultProps = {};

TimelineConnector.propTypes = {};
