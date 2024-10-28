import { useEffect, useRef } from "react";

type TSoundProps = {
	src: string;
	initialVolume?: number | undefined;
};

const useSound = ({ src, initialVolume = 0.25 }: TSoundProps) => {
	const audioRef = useRef(new Audio(src));

	const play = () => {
		if (!audioRef.current) return;
		audioRef.current.play();
	};
	const pause = () => {
		if (!audioRef.current) return;
		audioRef.current.pause();
	};
	const stop = () => {
		if (!audioRef.current) return;
		audioRef.current.pause();
		audioRef.current.currentTime = 0;
	};
	const changeVolume = (volume: number) => {
		// 1.0 === 100% (max)
		// 0.0 === 0% (mute)
		if (!audioRef.current) return;
		audioRef.current.volume = volume;
	};

	// pre-load audio src & set initial volume & listen for changes to 'initialVolume'
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (audioRef.current) {
			audioRef.current.volume = initialVolume;
			audioRef.current.load();
		}

		return () => {
			isMounted = false;
		};
	}, [initialVolume]);

	return {
		audioRef,
		play,
		pause,
		stop,
		changeVolume,
	};
};

export { useSound };
