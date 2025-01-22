import React, { useMemo, useState } from "react";
import styles from "../../css/layout/Carousel.module.scss";
import CustomImage from "../shared/CustomImage";

type Props = {
	images: string[];
	initialIdx: number;
};

type MainDisplayProps = {
	src: string;
	alt?: string;
};
const MainDisplay = ({ src, alt = "Project Screenshot" }: MainDisplayProps) => {
	return (
		<div className={styles.MainDisplay}>
			<CustomImage src={src} alt={alt} />
		</div>
	);
};

const Carousel = ({ images, initialIdx = 0 }: Props) => {
	const [currentIdx, setCurrentIdx] = useState<number>(initialIdx);
	const currentImage = useMemo(() => {
		const current = images[currentIdx] || images[0];

		return current;
	}, [currentIdx, images]);
	return (
		<div className={styles.Carousel}>
			<div className={styles.Carousel_main}>
				<MainDisplay src={currentImage} />
			</div>

			{/*  */}
			{/*  */}
		</div>
	);
};

export default Carousel;
