import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ThemeContextType {
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
  prefersDarkMode: boolean;
  handleChange: () => void;
  accentColor: string;
  handleAccentColor: (e: SelectChangeEvent) => void;
}

const ThemeContext = createContext({} as ThemeContextType);

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  // theming
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);

  const handleChange = () => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  };

  const [accentColor, setAccentColor] = useState("green");

  const handleAccentColor = (e: SelectChangeEvent) => {
    setAccentColor(e.target.value);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        prefersDarkMode,
        handleChange,
        accentColor,
        handleAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
