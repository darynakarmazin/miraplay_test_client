import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import GameCategoriesPage from "../pages/GameCategoriesPage/GameCategoriesPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import { useDispatch } from "react-redux";
import { useAuth } from "../redux/auth/useAuth";
import { useEffect } from "react";
import { refreshUser } from "../redux/auth/operations";
import { Layout } from "./layout/Layout";

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <PrivateRoute
              redirectTo="login"
              component={<GameCategoriesPage />}
            />
          }
        />

        <Route
          path="register"
          element={
            <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
          }
        />

        <Route
          path="login"
          element={<RestrictedRoute redirectTo="/" component={<LoginPage />} />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
