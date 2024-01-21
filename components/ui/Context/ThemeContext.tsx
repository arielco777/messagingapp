import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

interface ThemeContextProps {
    dark: boolean;
    setDark: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
    dm: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    dm,
}) => {
    const [dark, setDark] = useState<boolean>(dm);

    return (
        <ThemeContext.Provider value={{ dark, setDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
