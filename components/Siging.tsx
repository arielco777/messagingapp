import React, { useEffect, useState } from "react";
// import { useTheme } from "../components/ui/Context/ThemeContext";
import { setDefaultHighWaterMark } from "stream";
import DarkToggle from "@/components/ui/DarkToggle";

const Signin = () => {
    const url = process.env.NEXT_PUBLIC_LOCAL_URL;

    const createUser = async (info: any) => {
        info.preventDefault();
        const username = info.target[0].value;
        const password = info.target[1].value;

        const response = await fetch(`${url}/create`, {
            headers: {
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const data = await response.json();
        const responseDiv = document.getElementById("response");
        if (responseDiv) responseDiv.innerHTML = data.message;
    };

    const login = async (info: any) => {
        console.log(url);
        info.preventDefault();
        const username = info.target[0].value;
        const password = info.target[1].value;

        const response = await fetch(`${url}/login`, {
            headers: {
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();
        const responseDiv = document.getElementById("response");
        if (responseDiv) responseDiv.innerHTML = data.message;
    };

    const inputClass =
        "dark:bg-neutral-600 dark:text-neutral-50 rounded mr-10 focus:outline-none px-1 py-1";

    // const { dark } = useTheme();

    // useEffect(() => {
    //     localStorage.setItem("dm", JSON.stringify(dark));
    // }, [dark]);

    return (
        <div className={` `}>
            <div className="h-screen dark:bg-neutral-900 bg-neutral-200 transition-all duration-300">
                <div className="w-14 h-7 absolute right-5 top-5">
                    <DarkToggle />
                </div>

                <h1 className="dark:text-neutral-100 text-lg underline">
                    Create User
                </h1>
                <form
                    onSubmit={createUser}
                    className="dark:text-neutral-100 mb-10"
                >
                    <label className="dark:text-neutral-100">Username: </label>
                    <input className={inputClass} type="text" name="username" />
                    <label>Password: </label>
                    <input
                        className={inputClass}
                        type="password"
                        name="password"
                    />
                    <button
                        type="submit"
                        className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                </form>
                <h1 className="dark:text-neutral-100 text-lg underline">
                    Sign In
                </h1>
                <form onSubmit={login} className="dark:text-neutral-100 ">
                    <label>Username: </label>
                    <input className={inputClass} type="text" name="username" />
                    <label>Password: </label>
                    <input
                        className={inputClass}
                        type="password"
                        name="password"
                    />
                    <button
                        type="submit"
                        className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                </form>
                <div id="response"></div>
            </div>
        </div>
    );
};

export default Signin;
