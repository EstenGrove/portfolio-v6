import { ReactNode } from "react";
import styles from "../../css/shared/Label.module.scss";

type Props = { id: string; children?: ReactNode };

const Label = ({ id, children }: Props) => {
	return (
		<div className={styles.Label}>
			<label htmlFor={id} className={styles.Label_main}>
				{children}
			</label>
		</div>
	);
};

export default Label;
