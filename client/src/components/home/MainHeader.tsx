import { useState } from "react";
import styles from "../../css/home/MainHeader.module.scss";
import Modal from "../shared/Modal";
import ResumeModal from "../shared/ResumeModal";
// import resume from '../../assets/docs/Resume.pdf';

type ButtonProps = {
	viewResume: () => void;
};
const ResumeButton = ({ viewResume }: ButtonProps) => {
	return (
		<button type="button" onClick={viewResume} className={styles.ResumeButton}>
			Resume
		</button>
	);
};

const MainHeader = () => {
	const [viewResume, setViewResume] = useState(false);

	const openResumeModal = () => {
		setViewResume(true);
	};
	const closeResumeModal = () => {
		setViewResume(false);
	};

	return (
		<div className={styles.MainHeader}>
			<h1 className={styles.MainHeader_intro}>
				Hi<b>,</b>
			</h1>
			<h3 className={styles.MainHeader_name}>
				I'm Steven G<b>.</b>
			</h3>
			<h2 className={styles.MainHeader_title}>Software Developer</h2>
			<ResumeButton viewResume={openResumeModal} />

			{viewResume && (
				<ResumeModal onClose={closeResumeModal}>
					<div>
						<h2>Resume goes here...</h2>
					</div>
				</ResumeModal>
			)}
		</div>
	);
};

export default MainHeader;
