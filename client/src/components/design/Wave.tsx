import { ComponentPropsWithoutRef } from "react";
import styles from "../../css/design/Wave.module.scss";

type WaveProps = {
	fill?: string;
};
const TopWave = ({ fill = "var(--accent)", ...rest }: WaveProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1440 320"
			className={styles.TopWave}
			preserveAspectRatio="none"
			height="30rem"
			{...rest}
		>
			<path
				fill={fill}
				fillOpacity="1"
				d="M0,64L120,90.7C240,117,480,171,720,186.7C960,203,1200,181,1320,170.7L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
			></path>
		</svg>
	);
};

interface Props extends WaveProps, ComponentPropsWithoutRef<"div"> {}

const Wave = ({ fill = "var(--accent)", ...rest }: Props) => {
	return (
		<div className={styles.Wave} {...rest}>
			<TopWave fill={fill} />
		</div>
	);
};

export default Wave;
