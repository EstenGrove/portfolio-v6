import { ComponentPropsWithoutRef } from "react";
import styles from "../../css/shared/CustomImage.module.scss";

type CustomImageProps = {
	src: string;
	alt?: string;
	width?: string | number;
	height?: string | number;
};

// @ts-expect-error: this is fine
interface Props extends CustomImageProps, ComponentPropsWithoutRef<"img"> {}

const CustomImage = ({
	src,
	alt,
	width = "100%",
	height = "100%",
	...rest
}: Props) => {
	return (
		<div className={styles.CustomImage}>
			<img src={src} alt={alt} className={styles.CustomImage_img} {...rest} />
		</div>
	);
};

export default CustomImage;
