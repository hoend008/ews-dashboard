import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface DataContextType {
  contaminant: string;
  setContaminant: Dispatch<SetStateAction<string>>;
  product: string;
  setProduct: Dispatch<SetStateAction<string>>;
  countryCode: string;
  setCountryCode: Dispatch<SetStateAction<string>>;
  feedconversionID: number;
  setFeedconversionID: Dispatch<SetStateAction<number>>;
}

const DataContext = createContext({} as DataContextType);

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {

  const [contaminant, setContaminant] = useState("deoxynivalenol (don)");
  const [product, setProduct] = useState("maize");
  const [feedconversionID, setFeedconversionID] = useState(0);

  // set state variable that holds country and function to update country
  const [countryCode, setCountryCode] = useState("");

  // theming
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);

  return (
    <DataContext.Provider
      value={{
        contaminant,
        setContaminant,
        product,
        setProduct,
        countryCode,
        setCountryCode,
        feedconversionID,
        setFeedconversionID,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
