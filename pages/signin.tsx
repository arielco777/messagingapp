import React, { useEffect, useState } from "react";
import { useTheme } from "../components/ui/Context/ThemeContext";
import { setDefaultHighWaterMark } from "stream";
import DarkToggle from "@/components/ui/DarkToggle";
import Signin from "@/components/Siging";

const signin = () => {
    return (
        <div className="w-screen h-screen">
            <Signin />
        </div>
    );
};

export default signin;
