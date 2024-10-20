import React, { ReactNode } from "react";
import styles from "../../css/errors/ErrorBoundary.module.scss";

export interface ErrorInfo {
	componentStack?: string | null;
	digest?: string | null;
}

export type CompProps = {
	children?: ReactNode;
};

type FallbackProps = {
	error: Error;
};

export const ErrorFallback = ({ error }: FallbackProps) => {
	const msg = error?.message;
	const trace = error?.stack;
	return (
		<div className={styles.ErrorFallback}>
			<h1 className={styles.ErrorFallback_header}>Error Occurred</h1>
			<div className={styles.ErrorFallback_type}>Type: {error?.name}</div>
			<div className={styles.ErrorFallback_msg}>{msg}</div>
			<div className={styles.ErrorFallback_msg}>{trace}</div>
		</div>
	);
};

export class ErrorBoundary extends React.Component {
	public state: {
		hasError: boolean;
		error: Error | null;
		errorInfo: ErrorInfo | null;
	};
	public fallback?: ReactNode;
	public children?: ReactNode;

	constructor(props: CompProps) {
		super(props);

		this.children = props?.children;
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(err: Error) {
		return { hasError: true, error: err, errorInfo: null };
	}
	componenthasError(error: Error, errorInfo: React.ErrorInfo): void {
		this.state = {
			hasError: true,
			error: error,
			errorInfo: errorInfo,
		};
		console.log("[ERROR]:", error);
		console.error(error, errorInfo);
		console.log("errorInfo.digest", errorInfo.digest);
	}

	render() {
		if (this.state.hasError) {
			const err = this.state.error as Error;
			return <ErrorFallback error={err} />;
		}

		return <>{this.children}</>;
	}
}
