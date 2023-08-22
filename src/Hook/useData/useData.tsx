import { useCountryContext } from "../../Context/Context";
import countries from "../../API/mockData/data.json";
import { CountryData } from "../../Types/Types";

const useData = () => {
  const { setCountryToShow } = useCountryContext();
  const removeDiacritic = (string: string) => {
    const pureString = string
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
    return pureString;
  };

  const getAllCountries = async () => {
    setCountryToShow(await countries);
  };

  const getCountryByName = (name: string) => {
    const currentCountry = countries.find((country) => {
      return removeDiacritic(country.name) === removeDiacritic(name);
    });
    return currentCountry || null;
  };

  const filterCountriesByName = (dataArr: CountryData[], value: string) => {
    const filteredCountriesByName = dataArr.filter((country) =>
      removeDiacritic(country.name).includes(removeDiacritic(value))
    );

    setCountryToShow(filteredCountriesByName);
  };

  const filterCountriesByRegion = (dataArr: CountryData[], value: string) => {
    const filteredCountriesByRegion = dataArr.filter(
      (country) => country.region === value
    );
    setCountryToShow(filteredCountriesByRegion);
    return filteredCountriesByRegion;
  };
  return {
    getAllCountries,
    filterCountriesByName,
    filterCountriesByRegion,
    getCountryByName,
  };
};

export default useData;
