import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import "./App.css";
import "./assets/styles/global.scss";
import { AuthLayout } from "./components/layouts/auth-layout";
import { MainLayout } from "./components/layouts/main/main-layout";
import ProtectedRoute from "./route/protected-route";
import { IRoute, Layouts, routes } from "./route/routes";
import theme from "./utils/theme";
import store from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("user")));
  }, []);
  let persistor = persistStore(store);
  console.log(!isLoggedIn);
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ToastContainer rtl />
          <div dir="rtl">
            <BrowserRouter>
              <Routes>
                {!isLoggedIn && (
                  <Route index element={<Navigate replace to="/login" />} />
                )}
                {routes.map((item: IRoute, index: number) => {
                  return (
                    <Route
                      key={index}
                      path={item.path}
                      element={
                        item.protected ? (
                          <ProtectedRoute>
                            {item.layout === Layouts.AUTH ? (
                              <div>
                                <AuthLayout>{item.component}</AuthLayout>
                              </div>
                            ) : (
                              <div>
                                <MainLayout>{item.component}</MainLayout>
                              </div>
                            )}
                          </ProtectedRoute>
                        ) : item.layout === Layouts.AUTH ? (
                          !isLoggedIn ? (
                            <AuthLayout>{item.component}</AuthLayout>
                          ) : (
                            <Navigate replace to="/" />
                          )
                        ) : (
                          <MainLayout>{item.component}</MainLayout>
                        )
                      }
                    />
                  );
                })}
                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
            </BrowserRouter>
          </div>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
