import { UserMenu } from "../userMenu/UserMenu";
import { Navigation } from "../navigation/Navigation";
import { AuthNav } from "../authNav/AuthNav";
import { useAuth } from "../../redux/auth/useAuth";
import styles from "./AppBar.module.css";

function AppBar() {
  const { isLoggedIn } = useAuth();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerWrapper}>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
    </header>
  );
}

export default AppBar;
