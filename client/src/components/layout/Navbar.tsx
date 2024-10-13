import { useState } from "react";
import sprite from "../../assets/icons/portfolio.svg";
import styles from "../../css/layout/Navbar.module.scss";
import { NavLink } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";

const isActive = ({ isActive }: { isActive: boolean }) => {
	if (!isActive) return;
	return styles.isActive;
};

type CloseProps = {
	closeMenu: () => void;
};
type MenuProps = {
	openMenu: () => void;
};
type OverlayProps = {
	closeMenu: () => void;
};

const CloseIcon = ({ closeMenu }: CloseProps) => {
	return (
		<svg className={styles.CloseIcon} onClick={closeMenu}>
			<use xlinkHref={`${sprite}#icon-clear`}></use>
		</svg>
	);
};

const MenuIcon = ({ openMenu }: MenuProps) => {
	return (
		<div className={styles.MenuIcon} onClick={openMenu}>
			<div className={styles.MenuIcon_line}></div>
			<div className={styles.MenuIcon_line}></div>
			<div className={styles.MenuIcon_line}></div>
		</div>
	);
};

const MobileOverlay = ({ closeMenu }: OverlayProps) => {
	return (
		<aside className={styles.MobileOverlay}>
			<div className={styles.MobileOverlay_top}>
				<CloseIcon closeMenu={closeMenu} />
			</div>
			<ul className={styles.MobileOverlay_list}>
				<li className={styles.MobileOverlay_list_item} onClick={closeMenu}>
					<NavLink to="/" className={isActive}>
						home<b>.</b>
					</NavLink>
				</li>
				<li className={styles.MobileOverlay_list_item} onClick={closeMenu}>
					<NavLink to="/about" className={isActive}>
						about<b>.</b>
					</NavLink>
				</li>
				<li className={styles.MobileOverlay_list_item} onClick={closeMenu}>
					<NavLink to="/projects" className={isActive}>
						projects<b>.</b>
					</NavLink>
				</li>
				<li className={styles.MobileOverlay_list_item} onClick={closeMenu}>
					<NavLink to="/snippets" className={isActive}>
						snippets<b>.</b>
					</NavLink>
				</li>
				<li className={styles.MobileOverlay_list_item} onClick={closeMenu}>
					<NavLink to="/contact" className={isActive}>
						contact<b>.</b>
					</NavLink>
				</li>
			</ul>
		</aside>
	);
};

const DesktopList = () => {
	return (
		<ul className={styles.DesktopList}>
			<li className={styles.DesktopList_item}>
				<NavLink to="/" className={isActive}>
					home<b>.</b>
				</NavLink>
			</li>
			<li className={styles.DesktopList_item}>
				<NavLink to="/about" className={isActive}>
					about<b>.</b>
				</NavLink>
			</li>
			<li className={styles.DesktopList_item}>
				<NavLink to="/projects" className={isActive}>
					projects<b>.</b>
				</NavLink>
			</li>
			<li className={styles.DesktopList_item}>
				<NavLink to="/snippets" className={isActive}>
					snippets<b>.</b>
				</NavLink>
			</li>
			<li className={styles.DesktopList_item}>
				<NavLink to="/contact" className={isActive}>
					contact<b>.</b>
				</NavLink>
			</li>
		</ul>
	);
};

const MobileList = ({ openMenu }: MenuProps) => {
	return (
		<ul className={styles.MobileList}>
			<li className={styles.MobileList_menuIcon}>
				<MenuIcon openMenu={openMenu} />
			</li>
		</ul>
	);
};

const Navbar = () => {
	const winSize = useWindowSize();
	const [showMobileOverlay, setShowMobileOverlay] = useState(false);

	const openMenu = () => {
		setShowMobileOverlay(true);
	};
	const closeMenu = () => {
		setShowMobileOverlay(false);
	};

	return (
		<nav className={styles.Navbar}>
			<div className={styles.Navbar_logo}>
				<NavLink to="/">
					s<b>{">"}</b>gore
				</NavLink>
			</div>
			{winSize.width >= 750 ? (
				<DesktopList />
			) : (
				<MobileList openMenu={openMenu} />
			)}

			{showMobileOverlay && <MobileOverlay closeMenu={closeMenu} />}
		</nav>
	);
};

export default Navbar;
