import styles from "./styles.module.scss";

interface ChevronProps {
  rotate: string;
  color: string;
}

const Chevron = ({ rotate, color }: ChevronProps) => {
  return (
    <svg
      className={styles.chevron}
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={`rotate(${rotate})`}
    >
      <path
        d="M6 15L12 9L18 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Chevron;
