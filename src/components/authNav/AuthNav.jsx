import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

export const AuthNav = () => {
  return (
    <div className={styles.authnav}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${styles.authnavLink} ${styles.active}`
            : `${styles.authnavLink}`
        }
        to="/register"
      >
        Реєстрація
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${styles.authnavLink} ${styles.active}`
            : `${styles.authnavLink}`
        }
        to="/login"
      >
        Вхід
      </NavLink>
    </div>
  );
};
