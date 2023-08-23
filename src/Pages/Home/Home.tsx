import Header from "../../Components/Header/Header";
import { useCountryContext } from "../../Context/Context";
import { ChangeEvent, useEffect, useState } from "react";
import useData from "../../Hook/useData/useData";
import Card from "./Component/Card/Card";
import styles from "./styles.module.scss";
import countries from "../../API/mockData/data.json";
import Select from "./Component/Select/Select";
import Loupe from "../../Components/Loupe/Loupe";
import { CountryData } from "../../Types/Types";
import Undo from "../../Components/Undo/Undo";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const { countryToShow, region, setRegion, theme } = useCountryContext();
  const { getAllCountries, filterCountriesByName, filterCountriesByRegion } =
    useData();
  const themeClass = theme === "Light" ? styles.lightTheme : styles.darkTheme;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setRegion("");
    getAllCountries();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let dataToFilter = countries as CountryData[];

      if (region === "" && searchValue === "") {
        getAllCountries();
      }

      if (region !== "") {
        dataToFilter = filterCountriesByRegion(countries, region);
      }

      if (searchValue !== "") {
        filterCountriesByName(dataToFilter, searchValue);
      }
    };

    filterData();
  }, [region, searchValue]);

  return (
    <div className={`container ${themeClass}`}>
      <Header />
      <main className={styles.homeMain}>
        <div className={styles.filterContainers}>
          <div className={styles.inputContainer}>
            <Loupe color={theme === "Light" ? "#858585" : "white"} />
            <input
              value={searchValue}
              onChange={(e) => handleInputChange(e)}
              type="text"
              placeholder="Search for a country..."
            ></input>
          </div>
          <div className={styles.selectContainer}>
            <Select className={styles.customSelect} />
            <button
              className={styles.resetButton}
              onClick={() => setRegion("")}
            >
              <Undo color={theme === "Light" ? "black" : "white"} />
            </button>
          </div>
        </div>
        <section className={styles.cardContainer}>
          {countryToShow.length !== 0 ? (
            countryToShow.map((country, index) => (
              <Card
                country={country}
                key={index}
                themeCardInfos={styles.customCardInfos}
                themeCard={styles.customCard}
              />
            ))
          ) : (
            <h2>No country was found</h2>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
