import styles from "../../css/shared/Picture.module.scss";

interface PictureSource {
	srcSet: HTMLSourceElement["srcset"];
	media?: HTMLSourceElement["media"];
	type?: HTMLSourceElement["type"];
}

type Props = {
	sourceList: PictureSource[];
	fallbackSrc: string;
	alt?: string;
	width?: number | string;
	height?: number | string;
	[key: string]: unknown;
};

const Picture = ({
	sourceList,
	fallbackSrc,
	alt,
	width,
	height,
	...rest
}: Props) => {
	return (
		<picture className={styles.Picture}>
			{sourceList &&
				sourceList.map((source, idx) => (
					<source key={source?.srcSet + idx} {...source} />
				))}
			<img
				src={fallbackSrc}
				alt={alt}
				width={width}
				height={height}
				className={styles.Picture_fallback}
				{...rest}
			/>
		</picture>
	);
};

export default Picture;
