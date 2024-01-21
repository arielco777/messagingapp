import type { AppProps } from "next/app";
import "../app/globals.css";

import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const [dark, setDark] = useState();

    useEffect(() => {
        const dm = localStorage.getItem("dm");
        if (dm === "undefined") {
            // setDark(false);
            return;
        }
        if (dm) setDark(JSON.parse(dm));
    }, []);

    return <Component {...pageProps} />;
}
