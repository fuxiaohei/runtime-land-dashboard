import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { getLocalInfo } from "../api/client";
import ForgetPasswordPage from "../pages/selfhost/ForgetPassword";
import LoginPage from "../pages/selfhost/Login";
import RegisterPage from "../pages/selfhost/Register";
import ResetPasswordPage from "../pages/selfhost/ResetPassword";

const HostContext = React.createContext(null);

function LoginApp() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/reset_password/:token" element={<ResetPasswordPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

function HostProvider({ children }) {
  const localData = getLocalInfo();
  let values = {
    isSignedIn: true,
  };

  // no logged data, redirect to login page
  if (!localData) {
    values.isSignedIn = false;
    return <LoginApp />;
  }

  return <HostContext.Provider value={values}>{children}</HostContext.Provider>;
}

export { HostContext, HostProvider };
