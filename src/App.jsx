import {
    ClerkLoaded,
    ClerkLoading,
    ClerkProvider,
    SignIn,
    SignUp,
} from "@clerk/clerk-react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { isClerkJs } from "./config";
import { HostProvider } from "./layouts/HostContext";
import AccountPage from "./pages/Account";
import LoadingPage from "./pages/Loading";
import NotFoundPage from "./pages/NotFound";
import ProjectOverviewPage from "./pages/ProjectOverview";
import ProjectSettingPage from "./pages/ProjectSetting";
import ProjectsPage from "./pages/Projects";
import AdminDomainsPage from "./pages/admin/Domains";
import AdminEmailPage from "./pages/admin/Email";
import AdminRegionsPage from "./pages/admin/Regions";
import AdminStatsPage from "./pages/admin/Stats";
import AdminStoragePage from "./pages/admin/Storage";
import AdminTokensPage from "./pages/admin/Tokens";

const routes = [
  { path: "/", element: <Navigate to="/projects" replace /> },
  { path: "/projects", element: <ProjectsPage /> },
  { path: "/projects/:name/overview", element: <ProjectOverviewPage /> },
  { path: "/projects/:name/setting", element: <ProjectSettingPage /> },
  { path: "/account", element: <AccountPage /> },
  { path: "/admin/stats", element: <AdminStatsPage /> },
  { path: "/admin/regions", element: <AdminRegionsPage /> },
  { path: "/admin/domains", element: <AdminDomainsPage /> },
  { path: "/admin/storage", element: <AdminStoragePage /> },
  { path: "/admin/tokens", element: <AdminTokensPage /> },
  { path: "/admin/email", element: <AdminEmailPage /> },
  { path: "*", element: <NotFoundPage /> },
];

function renderRoute(route) {
  return <Route key={route.path} path={route.path} element={route.element} />;
}

function ClerkApp() {
  return (
    <ClerkProvider publishableKey={CLERK_KEY}>
      <ClerkLoading>
        <LoadingPage />
      </ClerkLoading>
      <ClerkLoaded>
        <Routes>
          <Route element={<Outlet />}>
            <Route
              path="/sign-in/*"
              element={<SignIn routing="path" path="/sign-in" />}
            />
            <Route
              path="/sign-up/*"
              element={<SignUp routing="path" path="/sign-up" />}
            />
            {routes.map(renderRoute)}
          </Route>
        </Routes>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function HostApp() {
  return (
    <HostProvider>
      <Routes>
        <Route element={<Outlet />}>{routes.map(renderRoute)}</Route>
      </Routes>
    </HostProvider>
  );
}

const app = isClerkJs ? <ClerkApp /> : <HostApp />;
export default app;
