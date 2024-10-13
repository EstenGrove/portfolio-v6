import styles from "../../css/home/TimelineDot.module.scss";

type Props = {
	color?: string;
	type?: string;
};

const dotColors = {
	solid: {
		purple: "rgb(105 25 255)",
		green: "rgb(0, 226, 189)",
		blue: "rgb(37, 99, 235)",
		red: "rgb(220, 38, 38)",
	},
	flat: {
		purple: "rgb(180, 140, 255)",
		blue: "rgb(147, 197, 253)",
		green: "#4debd1",
		red: "rgb(248, 113, 113)",
	},
};

const getDotColor = (type: string, color: string): string => {
	const typeMap = dotColors?.[type as keyof object] ?? dotColors.flat;
	const mainColor = typeMap?.[color];
	return mainColor;
};

const TimelineDot = ({ color, type = "flat" }: Props) => {
	return (
		<div
			data-timeline="dot"
			className={styles.TimelineDot}
			style={{ backgroundColor: getDotColor(type, color as string) }}
		>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default TimelineDot;

TimelineDot.defaultProps = {};

TimelineDot.propTypes = {};
