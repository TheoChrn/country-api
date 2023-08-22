import { useCountryContext } from "../../Context/Context";
import Moon from "../Moon";
import Sun from "../Sun";
import styles from "./styles.module.scss";

const Header = () => {
  const { theme, setTheme } = useCountryContext();
  const themeClass = theme === "Light" ? styles.lightTheme : styles.darkTheme;
  return (
    <header className={`${styles.header} ${themeClass}`}>
      <h1>Where in the world ?</h1>
      <div className={styles.theme}>
        <button
          className={styles.themeToggle}
          onClick={() => setTheme(theme === "Light" ? "Dark" : "Light")}
        >
          {theme === "Light" ? <Sun /> : <Moon />}
        </button>
        <span>{`${theme} Mode`}</span>
      </div>
    </header>
  );
};

export default Header;
