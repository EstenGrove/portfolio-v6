import { ChangeEvent, ReactNode } from "react";
import styles from "../../css/contactme/ContactMeForm.module.scss";
import TextInput from "../shared/TextInput";
import Label from "../shared/Label";
import TextArea from "../shared/TextArea";

interface FormValues {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
}

type Props = {
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onSubmit: () => void;
	values: FormValues;
	isSubmitting: boolean;
};

type RowProps = {
	children?: ReactNode;
};
const FormRow = ({ children }: RowProps) => {
	return <div className={styles.FormRow}>{children}</div>;
};

const enableSubmit = (values: FormValues) => {
	const entries = Object.entries(values);

	return entries.every(([key, val]) => {
		// 'message' field is optional
		if (key === "message") return true;
		return !!val && val !== "";
	});
};

const ContactMeForm = ({
	values,
	onChange,
	onSubmit,
	isSubmitting = false,
}: Props) => {
	const isBtnDisabled = !enableSubmit(values);

	return (
		<form className={styles.ContactMeForm}>
			<FormRow>
				<div className={styles.ContactMeForm_field}>
					<Label id="firstName">First Name</Label>
					<TextInput
						id="firstName"
						name="firstName"
						value={values.firstName}
						onChange={onChange}
						placeholder="Jessica..."
					/>
				</div>
				<div className={styles.ContactMeForm_field}>
					<Label id="lastName">Last Name</Label>
					<TextInput
						id="lastName"
						name="lastName"
						value={values.lastName}
						onChange={onChange}
						placeholder="Jameson..."
					/>
				</div>
			</FormRow>
			<FormRow>
				<div className={styles.ContactMeForm_field}>
					<Label id="email">Email</Label>
					<TextInput
						id="email"
						name="email"
						value={values.email}
						onChange={onChange}
						placeholder="my_email@gmail.com..."
					/>
				</div>
			</FormRow>
			<FormRow>
				<div className={styles.ContactMeForm_field}>
					<Label id="message">Message</Label>
					<TextArea
						id="message"
						name="message"
						value={values.message}
						onChange={onChange}
						placeholder="Hi, really like your site..."
						style={{ height: "15rem" }}
					/>
				</div>
			</FormRow>
			<FormRow>
				<button
					type="button"
					onClick={onSubmit}
					disabled={isBtnDisabled || isSubmitting}
					className={styles.ContactMeForm_submitBtn}
				>
					{isSubmitting ? "Sending..." : "Send Message"}
				</button>
			</FormRow>
		</form>
	);
};
export default ContactMeForm;
