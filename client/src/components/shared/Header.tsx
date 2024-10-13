import { ReactNode } from "react";
import styles from "../../css/shared/Header.module.scss";

type Props = { children: ReactNode };

const Header = ({ children }: Props) => {
	return <header className={styles.Header}>{children}</header>;
};

export default Header;
