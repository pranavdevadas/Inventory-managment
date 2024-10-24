import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import HomeScreen from "./screens/homeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminLoginScreen from "./screens/adminScreens/AdminLoginScreen.jsx";
import AdminHomeScreen from "./screens/adminScreens/AdminHomeScreen.jsx";
import AdminProductScreen from "./screens/adminScreens/AdminProductScreen.jsx";
import AdminOrderScreen from "./screens/adminScreens/AdminOrderScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginScreen />} />
      <Route path="/admin/home" element={<AdminHomeScreen />} />
      <Route path="/admin/product" element={<AdminProductScreen />} />
      <Route path="/admin/orders" element={<AdminOrderScreen />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
