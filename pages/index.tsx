import { setServers } from "dns";
import { useEffect, useState } from "react";

// const checkTables = async (url: string) => {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
// };

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

    return (
        <div>
            <div
                className={` h-screen relative bg-neutral-50 dark:bg-neutral-900 transition-all`}
            >
                <a href="messaging" className=" dark:text-white">
                    Messaging App
                </a>

                {/* <button onClick={checkWeather}>Test Weather</button> */}
            </div>
        </div>
    );
};

export default Page;
