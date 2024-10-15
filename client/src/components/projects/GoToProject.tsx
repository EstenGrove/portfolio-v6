import { CSSProperties, ReactNode } from "react";
import css from "../../css/projects/GoToProject.module.scss";
import sprite from "../../assets/icons/portfolio.svg";
import { NavLink } from "react-router-dom";

type Props = {
	to: string;
	children?: ReactNode;
	styles?: CSSProperties;
};

const GoToProject = ({ to, children, styles }: Props) => {
	return (
		<div data-link={to} className={css.GoToProject} style={styles}>
			<NavLink to={to} style={styles}>
				{children}
				<svg className={css.GoToProject_icon}>
					<use xlinkHref={`${sprite}#icon-keyboard_arrow_right`}></use>
				</svg>
			</NavLink>
		</div>
	);
};

export default GoToProject;
