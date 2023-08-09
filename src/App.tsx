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
function App() {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
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

            {/* <Route
              path="/"
              element={<ProtectedRoute>
                <MainLayout >
                  <HomePage />
                </MainLayout>
              </ProtectedRoute>
              }
            />
            <Route
              path="/programs"
              element={<ProtectedRoute>
                <MainLayout >
                  <Programs />
                </MainLayout>
              </ProtectedRoute>

              }
            />
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              }
            /> */}
          </Routes>
        </Router>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;





// <Router>
// <Routes>
//   <Route
//     path="/"
//     element={
//       <MainLayout>
//         <HomePage />
//       </MainLayout>
//     }
//   />
//   <Route
//     path="/users"
//     element={
//       <MainLayout>
//         <Users />
//       </MainLayout>
//     }
//   />
//   <Route
//     path="/roles"
//     element={
//       <MainLayout>
//         <Roles />
//       </MainLayout>
//     }
//   />
//   <Route
//     path="/login"
//     element={
//       <AuthLayout>
//         <LoginPage />
//       </AuthLayout>
//     }
//   />
//   <Route
//     path="/productRequest"
//     element={
//       <MainLayout>
//         <ProductRequestForm />
//       </MainLayout>
//     }
//   />
// </Routes>
// </Router>