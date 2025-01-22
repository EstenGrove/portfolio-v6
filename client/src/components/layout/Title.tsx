import React from "react";
import { CSSProperties } from "react";
import css from "../../css/layout/Title.module.scss";

type Props = {
	title?: string;
	styles?: CSSProperties;
};

const Title = ({ title, styles }: Props) => {
	return (
		<div className={css.Title} style={styles}>
			<h3 className={css.Title_heading} style={styles}>
				{title}
				<b>.</b>
			</h3>
		</div>
	);
};

export default Title;
