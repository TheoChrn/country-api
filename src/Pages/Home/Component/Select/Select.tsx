import { useState } from "react";
import { useCountryContext } from "../../../../Context/Context";
import styles from "./styles.module.scss";
import Chevron from "../../../../Components/Chevron/Chevron";

type SelectProps = {
  className: string;
};

const Select = ({ className }: SelectProps) => {
  const { regions, region, setRegion, theme } = useCountryContext();
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  const handleOptionSelection = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.currentTarget;
    const region = target.dataset.region;
    if (region) {
      setRegion(region);
      setSelectIsOpen(!selectIsOpen);
    }
  };
  return (
    <div className={`${styles.select}`}>
      <div
        className={`${styles.selectedRegion} ${className}`}
        onClick={() => setSelectIsOpen(!selectIsOpen)}
      >
        {region !== "" ? region : "Filter by Region"}
        <Chevron
          color={theme === "Light" ? "black" : "white"}
          rotate={selectIsOpen === true ? "180" : "0"}
        />
      </div>
      <div
        className={
          selectIsOpen === true
            ? `${styles.options} ${className}`
            : `${styles["options--hidden"]} ${className}`
        }
      >
        <ul>
          {Array.from(regions).map((region, index) => (
            <li
              key={index}
              data-region={region}
              onClick={(e) => handleOptionSelection(e)}
            >
              {region}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
