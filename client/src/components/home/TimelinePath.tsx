import React, { CSSProperties } from "react";
import cssModule from "../../css/home/TimelinePath.module.scss";

type Props = {
	styles?: CSSProperties | undefined;
};

const TimelinePath = ({ styles }: Props) => {
	return (
		<div data-timeline="path" className={cssModule.TimelinePath}>
			<div className={cssModule.TimelinePath_path} style={styles}></div>
		</div>
	);
};

export default TimelinePath;

TimelinePath.defaultProps = {};

TimelinePath.propTypes = {};
