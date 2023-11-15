import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav>
      <NavLink className={styles.menu} to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          viewBox="0 0 30 32"
          fill="none"
        >
          <path
            d="M28.978 18.229l-25.262 13.47c-1.683 0.897-3.715-0.322-3.715-2.229v-26.941c0-1.907 2.032-3.127 3.715-2.229l25.262 13.47c1.784 0.951 1.784 3.507 0 4.458zM10.024 23.133l8.918-4.755c1.982-1.057 1.982-3.699 0-4.755l-8.918-4.755c-1.982-1.057-4.459 0.264-4.459 2.378v9.511c0 2.114 2.477 3.434 4.459 2.378z"
            fill="#3f9c14"
          />
        </svg>
        ВСІ ІГРИ
      </NavLink>
    </nav>
  );
};
