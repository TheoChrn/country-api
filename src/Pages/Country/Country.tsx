import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useData from "../../Hook/useData/useData";
import Header from "../../Components/Header/Header";
import { formatPop } from "../../API/mockData/API";
import styles from "./styles.module.scss";
import { useCountryContext } from "../../Context/Context";
import countries from "../../API/mockData/data.json";
import { CountryData } from "../../Types/Types";

const Country = () => {
  const { name } = useParams();
  const [currentCountry, setCurrentCountry] = useState<CountryData | null>(
    null
  );
  const { theme } = useCountryContext();
  const [formattedBorderCountries, setFormattedBorderCountries] = useState<
    CountryData[]
  >([]);
  const { getCountryByName } = useData();
  const navigate = useNavigate();
  const themeClass = theme === "Light" ? styles.lightTheme : styles.darkTheme;

  const loadCountry = async () => {
    if (!name) {
      return navigate("/not-found");
    }
    const country = await getCountryByName(name);
    if (!country) {
      return navigate("/not-found");
    }
    setCurrentCountry(country);
  };

  useEffect(() => {
    loadCountry();
    if (currentCountry !== null && currentCountry.borders) {
      const borderCountries = replaceBorderCountry(currentCountry, countries);
      setFormattedBorderCountries(borderCountries);
    }
  }, [currentCountry, name]);

  const replaceBorderCountry = (
    currentCountry: CountryData,
    countries: CountryData[]
  ) => {
    if (currentCountry !== undefined) {
      const countryCodes = new Set(currentCountry.borders);

      const borderCountries = countries.filter((c) =>
        countryCodes.has(c.alpha3Code)
      );
      return borderCountries;
    }

    return [];
  };
  return (
    <div className={`container ${themeClass}`}>
      <Header />
      <main className={styles.currentCountryMain}>
        <NavLink
          className={`${styles.backButton} ${styles.backButtonAnimate}`}
          to="/"
        >
          <button>&#8592; Back</button>
        </NavLink>

        <section className={styles.currentCountry}>
          {currentCountry !== null && (
            <>
              <div className={styles.currentCountryFlag}>
                <figure>
                  <img
                    src={currentCountry.flag}
                    alt={`Drapeau ${currentCountry.name}`}
                  />
                </figure>
              </div>
              <div className={styles.currentCountryInfos}>
                <h2>{currentCountry.name}</h2>
                <div className={styles.currentCountryInfosList}>
                  <ul>
                    <li>
                      <span>Native Name: </span>
                      {currentCountry.nativeName}
                    </li>
                    <li>
                      <span>Population: </span>
                      {formatPop(currentCountry.population)}
                    </li>
                    <li>
                      <span>Region: </span>
                      {currentCountry.region}
                    </li>
                    <li>
                      <span>Sub Region: </span>
                      {currentCountry.subregion}
                    </li>
                    <li>
                      <span>Capital: </span>
                      {currentCountry.capital}
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>Top Level Domain: </span>
                      {currentCountry.topLevelDomain}
                    </li>
                    {currentCountry.currencies && (
                      <li>
                        <span>Currencies: </span>
                        {currentCountry.currencies[0].name}
                      </li>
                    )}
                    <li>
                      <span>Languages: </span>
                      {currentCountry.languages
                        .map((language) => {
                          return language.name;
                        })
                        .join(", ")}
                    </li>
                  </ul>
                  {currentCountry.borders && (
                    <div className={styles.currentCountryBorders}>
                      <h3>Border Countries:</h3>

                      <ul className={styles.currentCountryBordersList}>
                        {formattedBorderCountries.map((country, index) => {
                          return (
                            <NavLink key={index} to={`/${country.name}`}>
                              <li>{country.name}</li>
                            </NavLink>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Country;
