import React, { useEffect, useState } from "react";

type messages = {
    idx: number;
    who: string;
    message: string;
};

// const url =
//     process.env.NODE_ENV === "production"
//         ? process.env.NEXT_PUBLIC_PROD_URL
//         : process.env.NEXT_PUBLIC_LOCAL_URL;

const url = process.env.NEXT_PUBLIC_PROD_URL;

const ws = new WebSocket(`wss://${url}`);

const Messaging = () => {
    const [username, setUsername] = useState<string>("");
    const [messageHistory, setMessageHistory] = useState<messages[]>([]);

    const handleUsername = (event: any) => {
        event.preventDefault();
        setUsername(event.target[0].value);
    };

    const handleMessage = (event: any) => {
        event.preventDefault();
        const message = event.target[0].value;
        const newMessage = { who: username, message };

        // Send the new message through the WebSocket connection
        ws.send(JSON.stringify(newMessage));

        // Clear the input field
        event.target[0].value = "";
    };

    useEffect(() => {
        ws.onmessage = (event) => {
            const updatedMessageHistory = JSON.parse(event.data);
            setMessageHistory(updatedMessageHistory);
            console.log(event);
        };

        return () => {
            // Close the WebSocket connection when the component is unmounted
            ws.close();
        };
    }, []);

    return (
        <div className="w-full h-full ">
            {username == "" ? (
                <div>
                    <form onSubmit={handleUsername}>
                        <label htmlFor="username">Input a username</label>
                        <input
                            className="focus:outline-none border border-neutral-400 rounded"
                            name="username"
                            id="username"
                        />
                    </form>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center w-full h-full  ">
                    <p className=" w-5/6 py-1 pl-1">{username}</p>
                    <div className="mb-1 h-[70%] w-5/6 md:w-1/3 border border-neutral-600 rounded">
                        {messageHistory.map((m, index) => (
                            <div key={`${m.who}-${index}`}>
                                {index + 1} - {m.who}: {m.message}
                            </div>
                        ))}
                    </div>
                    <form
                        onSubmit={handleMessage}
                        className="w-5/6 md:w-1/3 h-10 border border-neutral-400 rounded flex justify-between"
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
                </div>
            )}
        </div>
    );
};

export default Messaging;
