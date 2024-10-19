import { useState, ChangeEvent } from "react";
import styles from "../../css/home/ContactMeSection.module.scss";
import ContactMeForm from "../contactme/ContactMeForm";

interface FormValues {
	firstName: string;
	lastName: string;
	email: string;
	// subject: string;
	message: string;
}

const initialState: FormValues = {
	firstName: "",
	lastName: "",
	email: "",
	// subject: "",
	message: "",
};

const ContactMeSection = () => {
	const [formValues, setFormValues] = useState<FormValues>(initialState);

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = async () => {
		//
	};

	return (
		<div className={styles.ContactMeSection}>
			<ContactMeForm
				values={formValues}
				onChange={onChange}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default ContactMeSection;
