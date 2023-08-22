import { ReactNode, createContext, useContext, useState } from "react";
import countries from "../API/mockData/data.json";
import { CountryData } from "../Types/Types";

interface CountryContext {
  countryToShow: CountryData[];
  setCountryToShow: React.Dispatch<React.SetStateAction<CountryData[]>>;
  regions: string[];
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const CountryContext = createContext<CountryContext>({
  countryToShow: [],
  setCountryToShow: () => {},
  regions: [],
  region: "",
  setRegion: () => {},
  theme: "",
  setTheme: () => {},
});

// Utilisation de la fonction comme déclaration
export function CountryContextProvider({ children }: { children: ReactNode }) {
  const [countryToShow, setCountryToShow] = useState<CountryData[]>([]);
  const [region, setRegion] = useState("");
  const [theme, setTheme] = useState("Light");
  const regions = Array.from(
    new Set(countries.map((country) => country.region))
  );

  const contextValue = {
    countryToShow,
    setCountryToShow,
    regions,
    region,
    setRegion,
    theme,
    setTheme,
  };

  return (
    <CountryContext.Provider value={contextValue}>
      {children}
    </CountryContext.Provider>
  );
}

export const useCountryContext = () => useContext(CountryContext);
