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
import { RotatingLines } from "react-loader-spinner";

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
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
