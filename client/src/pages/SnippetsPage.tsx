import Page from "../components/layout/Page";
import Title from "../components/layout/Title";
import styles from "../css/pages/SnippetsPage.module.scss";

const SnippetsPage = () => {
	return (
		<Page>
			<div className={styles.SnippetsPage}>
				<Title title="snippets" />
				<div
					className={styles.SnippetsPage_title}
					style={{
						margin: "10rem auto",
						fontSize: "2rem",
						textAlign: "center",
					}}
				>
					<h2>Coming Soon!</h2>
				</div>
				{/*  */}
				{/*  */}
			</div>
		</Page>
	);
};

export default SnippetsPage;
