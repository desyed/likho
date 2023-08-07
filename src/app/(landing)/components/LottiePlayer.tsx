"use client"

import {Player} from "@lottiefiles/react-lottie-player";

type LottiePlayerProps = {
    src: string;
    height?: number;
    width?: number;
}
const LottiePlayer = ({src, height, width}: LottiePlayerProps) => {
    return (
        <Player
            src={src}
            background="transparent"
            speed={1}
            loop={true}
            autoplay={true}
            style={{width: height || 300, height: width || 300}}
            className="player"
        />
    );
}

export default LottiePlayer;