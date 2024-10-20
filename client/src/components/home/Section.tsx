import { ComponentPropsWithoutRef, ReactNode, RefObject } from "react";
import styles from "../../css/home/Section.module.scss";

type SectionProps = {
	title: string;
	children?: ReactNode;
	sectionRef?: RefObject<HTMLElement>;
};

// @ts-expect-error: THIS IS FINE
interface Props extends SectionProps, ComponentPropsWithoutRef<"section"> {}

const Section = ({ title, children, sectionRef, ...rest }: Props) => {
	return (
		<section ref={sectionRef} className={styles.Section} {...rest}>
			<h2 className={styles.Section_title}>
				{title}
				<b>.</b>
			</h2>
			<div className={styles.Section_inner}>{children}</div>
		</section>
	);
};

export default Section;
