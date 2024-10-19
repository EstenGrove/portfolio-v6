import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import sprite from "../../assets/icons/theme.svg";
import styles from "../../css/design/ThemeToggle.module.scss";

const light = "sunset1";
const dark = "moon-stars1";

const ThemeToggle = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const icon = theme === "dark" ? dark : light;

	return (
		<div onClick={toggleTheme} className={styles.ThemeToggle}>
			<svg className={styles.ThemeToggle_icon}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
		</div>
	);
};

export default ThemeToggle;
