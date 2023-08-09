import {useEffect, useState} from "react";

const useReadingProgress = ()=>{
    const [readingProgress, setReadingProgress] = useState(0);
    const scrollListener = ()=>{
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        setReadingProgress(scrolled);
    };
    useEffect(()=>{
        window.addEventListener('scroll', scrollListener);
        return ()=>{
            window.removeEventListener('scroll', scrollListener);
        };
    }, []);
    return readingProgress;
}