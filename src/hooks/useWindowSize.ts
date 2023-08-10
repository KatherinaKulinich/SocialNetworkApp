import { useEffect, useState } from "react";

interface WindowSizeState {
    width: number;
    height: number;
}

export const useWindowSize = () => {
    const isSSR = typeof window === "undefined";
    
    const [windowSize, setWindowSize] = useState<WindowSizeState>({
        width: isSSR ? 1200 : window.innerWidth,
        height: isSSR ? 800 : window.innerHeight})


    const onChangeWindowSize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    useEffect(() => {
        window.addEventListener("resize", onChangeWindowSize);

        return () => {
            window.removeEventListener("resize", onChangeWindowSize);
        };
    }, []);

    return windowSize
}