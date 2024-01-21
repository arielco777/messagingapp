import React, { useEffect, useRef, useState } from "react";

type messages = {
    idx: number;
    who: string;
    message: string;
};

const url =
    process.env.NODE_ENV === "production"
        ? `wss://${process.env.NEXT_PUBLIC_PROD_URL}`
        : `ws://${process.env.NEXT_PUBLIC_LOCAL_URL}`;

const httpUrl =
    process.env.NODE_ENV === "production"
        ? `https://${process.env.NEXT_PUBLIC_PROD_URL}`
        : `http://${process.env.NEXT_PUBLIC_LOCAL_URL}`;

const ws = new WebSocket(url);

const users = [
    {
        username: "ariel",
        password: "csquared22",
    },
    {
        username: "eli",
        password: "popote",
    },
];

const Messaging = () => {
    const [username, setUsername] = useState<string>("");
    const [messageHistory, setMessageHistory] = useState<messages[]>([]);

    const messagesRef = useRef(null);

    const handleUsername = (event: any) => {
        event.preventDefault();
        const un = event.target[0].value;
        const pw = event.target[1].value;
        const userMatch = users.find(
            (user) => user.username === un && user.password === pw
        );

        if (userMatch) setUsername(un);
    };

    const handleMessage = (event: any) => {
        event.preventDefault();
        const message = event.target[0].value;
        if (message === "") return;
        const newMessage = { who: username, message };
        ws.send(JSON.stringify(newMessage));
        event.target[0].value = "";
    };

    const justLogged = async () => {
        const history = await fetch(`${httpUrl}/messaging`)
            .then((response) => response.json())
            .catch((error) =>
                console.error("Error getting history when logging in: ", error)
            );
        setMessageHistory(history);
    };

    useEffect(() => {
        justLogged();

        ws.onmessage = (event) => {
            const updatedMessageHistory = JSON.parse(event.data);
            // console.log("updatedmessage: ", updatedMessageHistory);
            setMessageHistory(updatedMessageHistory);
        };

        return () => {
            // Close the WebSocket connection when the component is unmounted
            ws.close();
        };
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the message container when messageHistory changes
        if (messagesRef.current) {
            (messagesRef.current as HTMLDivElement).scrollTop = (
                messagesRef.current as HTMLDivElement
            ).scrollHeight;
        }
    }, [messageHistory]);

    return (
        <div className="w-full h-full ">
            {username == "" ? (
                <div className="h-full w-full flex flex-col justify-center items-center ">
                    <form
                        onSubmit={handleUsername}
                        className="flex flex-col border border-neutral-300 p-4 rounded"
                    >
                        <label htmlFor="username" className="">
                            Username
                        </label>
                        <input
                            className="px-1  focus:outline-none border border-neutral-400 rounded"
                            name="username"
                            id="username"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className="px-1  focus:outline-none border border-neutral-400 rounded"
                            name="password"
                            id="password"
                            type="password"
                        />
                        <button
                            type="submit"
                            className="px-2 mt-3 text-white rounded  bg-blue-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <p className=" w-5/6 py-1 pl-1">{username}</p>
                    <div
                        className="mb-1 h-[70%] w-5/6 md:w-1/3 p-1 rounded border border-neutral-600 "
                        ref={messagesRef}
                        id="messageRef"
                    >
                        <div className="h-full overflow-y-auto flex flex-col gap-2">
                            {messageHistory.length > 0 &&
                                messageHistory.map((m, index) => (
                                    <div
                                        key={`${m.who}-${index}`}
                                        className={`${
                                            m.who === username
                                                ? "bg-green-300 text-right"
                                                : "bg-neutral-200"
                                        }  px-3 py-1 rounded `}
                                    >
                                        {m.who !== username && m.who + ": "}{" "}
                                        {m.message}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <form
                        onSubmit={handleMessage}
                        className="w-5/6 md:w-1/3 h-10 border border-blue-500 rounded flex justify-between"
                    >
                        <input
                            className="focus:outline-none rounded px-2 w-full"
                            type="text"
                            placeholder="Write your message here..."
                            name="message"
                        />
                        <button
                            type="submit"
                            className="px-2 text-white bg-blue-500 hover:bg-blue-400"
                        >
                            Send
                        </button>
                    </form>
                    <button
                        onClick={() => setUsername("")}
                        className="px-2 py-1 mt-1 rounded bg-red-500 hover:bg-red-400 text-white"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Messaging;
