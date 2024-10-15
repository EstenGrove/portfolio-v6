import { ReactNode } from "react";
import styles from "../../css/shared/Text.module.scss";

// supported element types to render 'as'
type AsElement = "span" | "div" | "p" | "label";

type Props = {
	as?: AsElement;
	size?: string;
	weight?: string;
	align?: string;
	color?: string;
	children?: ReactNode;
	classes?: string;
	[key: string]: unknown;
};

const getClassFromProps = (props: Partial<Props>) => {
	const { size, weight, align } = props;
	const list = [];
	const base = styles.Text;
	// determine size & weight class(s)
	const name = align && align?.charAt(0)?.toUpperCase() + align?.slice(1);
	const alignClass = styles[`align${name}`];
	const sizeClass = styles[`size${size}`];
	const weightClass = styles[`wt${weight}`];
	list.push(base, sizeClass, weightClass, alignClass);
	// css class lists
	return list.join(" ");
};

const renderAs = ({
	as,
	color,
	classes,
	children,
	...rest
}: Partial<Props>) => {
	switch (as) {
		case "p": {
			return (
				<p className={classes} style={{ color }} {...rest}>
					{children}
				</p>
			);
		}
		case "span": {
			return (
				<span className={classes} style={{ color }} {...rest}>
					{children}
				</span>
			);
		}
		case "label": {
			return (
				<label className={classes} style={{ color }} {...rest}>
					{children}
				</label>
			);
		}

		// default case is 'div' element
		default:
			return (
				<div className={classes} style={{ color }} {...rest}>
					{children}
				</div>
			);
	}
};

const Text = ({
	as = "div",
	size = "2",
	weight = "400",
	color = "#ffffff",
	align = "left",
	children,
	...rest
}: Props) => {
	const classes = getClassFromProps({ size, weight, align });

	const result = renderAs({
		as,
		color,
		classes,
		children,
		...rest,
	});

	return result;
};

export default Text;
