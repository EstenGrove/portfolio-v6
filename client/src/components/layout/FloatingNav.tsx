import styles from "../../css/layout/FloatingNav.module.scss";
import sprite from "../../assets/icons/portfolio.svg";
import { useNavigate } from "react-router-dom";

type Props = {
	goBack?: () => void;
	goForward?: () => void;
};

const enableForward = false;

const FloatingNav = ({ goBack, goForward }: Props) => {
	const navigate = useNavigate();

	const handleBack = () => {
		if (goBack) {
			return goBack();
		}

		navigate(-1);
	};

	const handleForward = () => {
		if (goForward) {
			return goForward();
		}

		navigate(+1);
	};

	return (
		<div className={styles.FloatingNav}>
			<button
				type="button"
				onClick={handleBack}
				className={styles.FloatingNav_backBtn}
			>
				<svg className={styles.FloatingNav_backBtn_icon}>
					<use xlinkHref={`${sprite}#icon-keyboard_arrow_left`}></use>
				</svg>
			</button>
			{enableForward && (
				<button
					type="button"
					onClick={handleForward}
					className={styles.FloatingNav_forwardBtn}
				>
					<svg className={styles.FloatingNav_forwardBtn_icon}>
						<use xlinkHref={`${sprite}#icon-keyboard_arrow_right`}></use>
					</svg>
				</button>
			)}
		</div>
	);
};

export default FloatingNav;
