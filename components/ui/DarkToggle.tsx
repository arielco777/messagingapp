import { useTheme } from "@/components/ui/Context/ThemeContext";
import React, { use, useEffect, useState } from "react";

const DarkToggle = ({ width = "full", height = "full" }) => {
    const { dark, setDark } = useTheme();

    const handle = () => {
        setDark(!dark);
    };

    useEffect(() => {
        localStorage.setItem("dm", JSON.stringify(dark));
    }, [dark]);

    return (
        <button
            onClick={handle}
            className={`w-${width} h-${height} relative dark:bg-neutral-50 bg-neutral-700 rounded-full border-2 border-neutral-800 dark:border-neutral-100 transition-all`}
        >
            <div
                className={`dark:ml-auto dark:bg-neutral-700 bg-neutral-50 transition-all w-1/2 h-full rounded-full`}
            ></div>
        </button>
    );
};

export default DarkToggle;
