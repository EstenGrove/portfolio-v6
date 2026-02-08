import { useState, ChangeEvent, useRef } from "react";
import sprite from "../../assets/icons/portfolio.svg";
import styles from "../../css/home/ContactMeSection.module.scss";
import ContactMeForm from "../contactme/ContactMeForm";
import { sleep } from "../../utils/utils_http";
import { ContactMeValues, sendContactMe } from "../../utils/utils_contact";

const initialState: ContactMeValues = {
	firstName: "",
	lastName: "",
	email: "",
	message: "",
};

const SuccessMessage = () => {
	return (
		<div className={styles.SuccessMessage}>
			<div className={styles.SuccessMessage_main}>
				<svg className={styles.SuccessMessage_icon}>
					<use xlinkHref={`${sprite}#icon-check_circle`}></use>
				</svg>
				<h2 className={styles.SuccessMessage_title}>Success!</h2>
			</div>
			<div className={styles.SuccessMessage_subtitle}>
				Your message was sent!
			</div>
		</div>
	);
};

// type FormState = 'idle' | 'submitting' | 'success' | 'failure';
enum FormState {
	idle = "idle",
	submitting = "submitting",
	success = "success",
	failure = "failure",
}

const ContactMeSection = () => {
	const messageRef = useRef<number | null>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [values, setValues] = useState<ContactMeValues>(initialState);
	const [submitStatus, setSubmitStatus] = useState<FormState>(FormState.idle);
	const showForm = submitStatus === FormState.idle || isSubmitting;

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const resetForm = () => {
		setIsSubmitting(false);
		setValues(initialState);
	};

	const resetMessage = () => {
		messageRef.current = setTimeout(() => {
			setSubmitStatus(FormState.idle);
		}, 3500);
	};

	const handleSubmit = async () => {
		let wasSuccessful = false;
		// after 2.5s reset the form regardless of status
		// do stuff
		await sleep(800);
		// await sendContactMe(values);
		// when finished...reset states

		if (wasSuccessful) {
			setSubmitStatus(FormState.success);
			resetMessage();
		} else {
			setSubmitStatus(FormState.failure);
			resetMessage();
		}

		resetForm();
	};

	return (
		<div className={styles.ContactMeSection}>
			{showForm && (
				<ContactMeForm
					values={values}
					onChange={onChange}
					isSubmitting={isSubmitting}
					onSubmit={() => {
						setIsSubmitting(true);
						handleSubmit();
					}}
				/>
			)}
			{submitStatus === FormState.success && <SuccessMessage />}
			{submitStatus === FormState.failure && <SuccessMessage />}
		</div>
	);
};

export default ContactMeSection;
