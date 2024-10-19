import { lazy, ReactNode, Suspense } from "react";
import Spinner from "../components/shared/Spinner";
import styles from "../css/pages/LazyPage.module.scss";

const Fallback = () => {
	return (
		<div className={styles.Fallback}>
			<Spinner />
			<div className={styles.Fallback_label}>Loading...</div>
		</div>
	);
};

type Props = {
	children?: ReactNode;
	path: string;
};

const LazyPage = ({ path }: Props) => {
	const Component = lazy(() => import(path));

	return (
		<>
			<Suspense fallback={<Fallback />}>
				<Component />
			</Suspense>
		</>
	);
};

export default LazyPage;
