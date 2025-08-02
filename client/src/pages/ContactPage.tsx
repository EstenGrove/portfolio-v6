import ContactMeSection from "../components/home/ContactMeSection";
import Page from "../components/layout/Page";
import Title from "../components/layout/Title";
import styles from "../css/pages/ContactPage.module.scss";

const ContactPage = () => {
	return (
		<Page>
			<div className={styles.ContactPage}>
				<Title title="contact me" />
				<div className={styles.ContactPage_form}>
					<ContactMeSection />
				</div>
			</div>
		</Page>
	);
};

export default ContactPage;
