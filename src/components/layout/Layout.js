import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AppBar from "../appBar/AppBar";

export const Layout = () => {
  return (
    <div>
      <AppBar />
      <div className="container">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
