import React from "react";
import { useState } from "react";
import sprite from "../../assets/icons/theme.svg";
import styles from "../../css/layout/Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import ThemeToggle from "../design/ThemeToggle";
import Logo from "../shared/Logo";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

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
	useLockBodyScroll();

	const githubItem = (
		<a
			href="https://github.com/EstenGrove"
			rel="noreferrer"
			target="_blank"
			className={styles.GithubItem}
		>
			<svg className={styles.GithubItem_icon}>
				<use xlinkHref={`${sprite}#icon-github`}></use>
			</svg>
		</a>
	);
	const emailItem = (
		<a
			href="mailto:echo.alchemist.design@gmail.com"
			rel="noreferrer"
			target="_blank"
			className={styles.EmailItem}
		>
			<svg className={styles.EmailItem_icon}>
				<use xlinkHref={`${sprite}#icon-alternate_email`}></use>
			</svg>
		</a>
	);

	return (
		<aside className={styles.MobileOverlay}>
			<div className={styles.MobileOverlay_top}>
				<Logo />
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
			<ul className={styles.MobileOverlay_socialBar}>
				<li className={styles.MobileOverlay_socialBar_item}>
					<ThemeToggle />
				</li>
				<li className={styles.MobileOverlay_socialBar_item}>{githubItem}</li>
				<li className={styles.MobileOverlay_socialBar_item}>{emailItem}</li>
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

const Email = () => {
	return (
		<a
			href="mailto:echo.alchemist.design@gmail.com"
			target="_blank"
			rel="noreferrer"
			className={styles.Email}
			title="Email me"
		>
			<svg className={styles.Email_icon}>
				<use xlinkHref={`${sprite}#icon-alternate_email`}></use>
			</svg>
		</a>
	);
};

const GitHub = () => {
	return (
		<a
			href="https://github.com/EstenGrove"
			rel="noreferrer"
			target="_blank"
			className={styles.GitHub}
			title="Visit my GitHub"
		>
			<svg className={styles.GitHub_icon}>
				<use xlinkHref={`${sprite}#icon-github`}></use>
			</svg>
		</a>
	);
};

const Toggle = () => {
	return (
		<div className={styles.Toggle}>
			<ThemeToggle />
		</div>
	);
};

const Island = () => {
	return (
		<aside className={styles.Island}>
			<div className={styles.Island_inner}>
				<Toggle />
				<GitHub />
				<Email />
			</div>
		</aside>
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
				<>
					<DesktopList />
					<Island />
				</>
			) : (
				<MobileList openMenu={openMenu} />
			)}

			{showMobileOverlay && <MobileOverlay closeMenu={closeMenu} />}
		</nav>
	);
};

export default Navbar;
