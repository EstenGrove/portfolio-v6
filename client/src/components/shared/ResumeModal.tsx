import { ReactNode, useRef } from "react";
import sprite from "../../assets/icons/portfolio.svg";
import styles from "../../css/shared/ResumeModal.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";

type Props = {
	onClose: () => void;
	children?: ReactNode;
};

const ResumeModal = ({ children, onClose }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	useOutsideClick(modalRef, onClose);
	useBackgroundBlur();
	return (
		<div ref={modalRef} className={styles.ResumeModal}>
			<div className={styles.ResumeModal_top}>
				<h2>Resume</h2>
				<button onClick={onClose} className={styles.ResumeModal_top_close}>
					<svg className={styles.ResumeModal_top_close_icon}>
						<use xlinkHref={`${sprite}#icon-clear`}></use>
					</svg>
				</button>
			</div>
			<div className={styles.ResumeModal_main}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default ResumeModal;
