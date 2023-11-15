import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useAuth } from "../../redux/auth/useAuth";
import styles from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className={styles.menuWrapper}>
      <p className={styles.menuGreeting}>Вітаємо, {user.email}</p>
      <button
        className={styles.menuLogoutBtn}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Вийти
      </button>
    </div>
  );
};
