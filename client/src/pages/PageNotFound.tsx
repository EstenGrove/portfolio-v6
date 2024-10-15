import Page from "../components/layout/Page";
import styles from "../css/pages/PageNotFound.module.scss";

const PageNotFound = () => {
	return (
		<Page>
			<div className={styles.PageNotFound}>
				<h1>404</h1>
				<h2>PAGE-NOT-FOUND</h2>
			</div>
		</Page>
	);
};

export default PageNotFound;
