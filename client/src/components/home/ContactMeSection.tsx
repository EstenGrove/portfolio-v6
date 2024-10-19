import { useState, ChangeEvent } from "react";
import styles from "../../css/home/ContactMeSection.module.scss";
import ContactMeForm from "../contactme/ContactMeForm";

interface FormValues {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
}

const initialState: FormValues = {
	firstName: "",
	lastName: "",
	email: "",
	message: "",
};

const ContactMeSection = () => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [formValues, setFormValues] = useState<FormValues>(initialState);

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = async () => {
		// do stuff

		// when finished...reset states
		setIsSubmitting(false);
		setFormValues(initialState);
	};

	return (
		<div className={styles.ContactMeSection}>
			<ContactMeForm
				values={formValues}
				onChange={onChange}
				isSubmitting={isSubmitting}
				onSubmit={() => {
					setIsSubmitting(true);
					handleSubmit();
				}}
			/>
		</div>
	);
};

export default ContactMeSection;
