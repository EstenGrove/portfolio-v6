import { ComponentPropsWithoutRef, RefObject } from "react";
import styles from "../../css/shared/Picture.module.scss";

interface PictureSource {
	srcSet: HTMLSourceElement["srcset"];
	media?: HTMLSourceElement["media"];
	type?: HTMLSourceElement["type"];
}

type PicProps = {
	sourceList: PictureSource[];
	fallbackSrc: string;
	alt?: string;
	width?: number | string;
	height?: number | string;
	imgRef?: RefObject<HTMLImageElement>;
	[key: string]: unknown;
};

interface Props extends PicProps, ComponentPropsWithoutRef<"img"> {}

const Picture = ({
	sourceList,
	fallbackSrc,
	alt,
	width,
	height,
	imgRef,
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
				ref={imgRef}
				className={styles.Picture_fallback}
				{...rest}
			/>
		</picture>
	);
};

export default Picture;
