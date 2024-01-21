import Messaging from "@/components/ui/Messaging";
import Head from "next/head";
import React from "react";

const messaging = () => {
    return (
        <>
            <Head>
                <title>Messaging app</title>
            </Head>
            <div className="w-screen h-screen">
                <Messaging />
            </div>
        </>
    );
};

export default messaging;
