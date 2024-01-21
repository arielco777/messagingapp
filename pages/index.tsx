import { setServers } from "dns";
import { useEffect, useState } from "react";
import { useTheme } from "../components/ui/Context/ThemeContext";
import DarkToggle from "@/components/ui/DarkToggle";

const checkTables = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
};

const Page = () => {
    // const url = process.env.NEXT_PUBLIC_LOCAL_URL;
    // useEffect(() => {
    //     checkTables(url);
    // }, []);

    // const checkWeather = async () => {
    //     const url = process.env.NEXT_PUBLIC_LOCAL_URL;
    //     const response = await fetch(`${url}/weather`);
    //     const data = await response.json();
    //     console.log(data);

    const { dark } = useTheme();

    useEffect(() => {
        localStorage.setItem("dm", JSON.stringify(dark));
    }, [dark]);

    return (
        <div className={`${dark && "dark"}`}>
            <div
                className={` h-screen relative bg-neutral-50 dark:bg-neutral-900 transition-all`}
            >
                <a href="signin" className=" dark:text-white">
                    Sign In
                </a>
                <div className="absolute top-5 right-5 w-14 h-7">
                    <DarkToggle />
                </div>
                {/* <button onClick={checkWeather}>Test Weather</button> */}
            </div>
        </div>
    );
};

export default Page;
