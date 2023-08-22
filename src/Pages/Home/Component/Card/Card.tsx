import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { formatPop } from "../../../../API/mockData/API";
import { CountryData } from "../../../../Types/Types";

interface CardProps {
  country: CountryData;
  themeCardInfos: string;
  themeCard: string;
}

const Card = ({ country, themeCardInfos, themeCard }: CardProps) => {
  return (
    <NavLink to={`/${country.name}`}>
      <article className={`${styles.card} ${themeCard}`}>
        <figure className={styles.countryFlagContainer}>
          <img src={country.flags.svg} alt={`Drapeau ${country.name}`} />
        </figure>
        <div className={`${styles.cardInfos} ${themeCardInfos}`}>
          <h2>{country.name}</h2>
          <ul>
            <li>
              <span>Population: </span>
              {formatPop(country.population)}
            </li>
            <li>
              <span>Region: </span>
              {country.region}
            </li>
            {country.capital && (
              <li>
                <span>Capital: </span>
                {country.capital}
              </li>
            )}
          </ul>
        </div>
      </article>
    </NavLink>
  );
};

export default Card;
