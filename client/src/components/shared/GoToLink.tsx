import { CSSProperties, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import css from "../../css/shared/GoToLink.module.scss";
import sprite from "../../assets/icons/portfolio.svg";

type Props = {
	to: string; // '/about', '/home' etc
	children?: ReactNode;
	styles?: CSSProperties;
};

const GoToLink = ({ to, children, styles = {} }: Props) => {
	return (
		<div className={css.GoToLink} style={styles}>
			<NavLink to={to} style={styles}>
				{children}
				<svg className={css.GoToLink_icon}>
					<use xlinkHref={`${sprite}#icon-keyboard_arrow_right`}></use>
				</svg>
			</NavLink>
		</div>
	);
};

export default GoToLink;
