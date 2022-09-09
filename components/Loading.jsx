import { useState } from "react";
import { useEffect } from "react";

const Loading = ({ className }) => {
    const [LoadingCount, setLoadingCount] = useState(0);
    function GetDots(count) {
        let dots = "";
        for (let i = 0; i < count; i++) {
            dots += ".";
        }
        return dots;
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingCount(e => {
                if (e >= 3) {
                    return 0;
                } else {
                    return e + 1;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [LoadingCount]);

    return (
        <h4 className={className}>
            Loading{GetDots(LoadingCount)}
        </h4>
    )
}

export default Loading;