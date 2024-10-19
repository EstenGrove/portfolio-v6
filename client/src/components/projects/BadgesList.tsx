import styles from "../../css/projects/BadgesList.module.scss";
import Badge from "./Badge";

type Size = "XSM" | "SM" | "MD" | "LG" | "XLG";

type Props = {
	list: string[];
	size?: Size;
};
const BadgesList = ({ list, size = "MD" }: Props) => {
	return (
		<div className={styles.BadgesList}>
			<ul className={styles.BadgesList_list}>
				{list &&
					list.map((badge) => <Badge key={badge} text={badge} size={size} />)}
			</ul>
		</div>
	);
};

export default BadgesList;
