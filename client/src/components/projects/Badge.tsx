import { CSSProperties } from "react";
import css from "../../css/projects/Badge.module.scss";

type Size = "XSM" | "SM" | "MD" | "LG" | "XLG";

type Props = {
	text: string;
	size?: Size;
	styles?: CSSProperties;
};

const sizes = {
	XSM: css.XSM,
	SM: css.SM,
	MD: css.MD,
	LG: css.LG,
	XLG: css.XLG,
};

const Badge = ({ text, styles, size = "MD" }: Props) => {
	const classes = `${css.Badge} ${sizes[size]}`;
	return (
		<li className={classes} style={styles}>
			{text}
		</li>
	);
};

export default Badge;
