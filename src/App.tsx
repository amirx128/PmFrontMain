import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import "./App.css";
import "./assets/styles/global.scss";
import { AuthLayout } from "./components/layouts/auth-layout";
import { MainLayout } from "./components/layouts/main/main-layout";
import ProtectedRoute from "./route/protected-route";
import { IRoute, Layouts, routes } from "./route/routes";
import theme from "./utils/theme";
import store from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  let persistor = persistStore(store);
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer rtl />
            <div dir="rtl">
              <Router>
              <Routes>
                {routes.map((item: IRoute, index: number) => {
                  return (
                    <Route key={index}
                      path={item.path}
                      element={
                        (item.protected) ? (
                          <ProtectedRoute>
                            {item.layout === Layouts.AUTH ? (<div><AuthLayout>{item.component}</AuthLayout></div>) : (<div><MainLayout>{item.component}</MainLayout></div>)}
                          </ProtectedRoute>)
                          : item.layout === Layouts.AUTH ? <AuthLayout>{item.component}</AuthLayout> : <MainLayout>{item.component}</MainLayout>
                      }
                    />
                  )
                })}
              </Routes>
            </Router>
            </div>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;