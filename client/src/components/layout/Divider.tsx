import { CSSProperties } from "react";
import css from "../../css/layout/Divider.module.scss";

type Props = {
	color?: string;
	styles?: CSSProperties;
	[key: string]: unknown;
};

const Divider = ({ color = "var(--border)", styles, ...rest }: Props) => {
	const custom = {
		backgroundColor: color,
		...styles,
	};
	return (
		<div
			data-label="divider"
			className={css.Divider}
			style={custom}
			{...rest}
		></div>
	);
};

export default Divider;
