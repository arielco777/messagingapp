import React, { useEffect, useState } from "react";

type messages = {
    idx: number;
    who: string;
    message: string;
};

const url =
    process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_LOCAL_URL;

const ws = new WebSocket(`ws://${url}`);

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
        <div className="w-full h-full">
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
                <div className="w-full h-full">
                    <div className="h-[70%] w-full md:w-1/3 border border-neutral-600">
                        {messageHistory.map((m, index) => (
                            <div key={`${m.who}-${index}`}>
                                {index + 1} - {m.who}: {m.message}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleMessage}>
                        <input
                            className="focus:outline-none border border-neutral-400 rounded"
                            type="text"
                            name="message"
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default Messaging;
