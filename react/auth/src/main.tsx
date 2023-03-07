import React from "react";
import ReactDOM from "react-dom/client";

import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Profile, Signup } from "@/routes";
import styles from "@/main.module.css";
import { AccountProvider } from "@/context/account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const Main = () => {
  return (
    <React.StrictMode>
      <AccountProvider>
        <div className={`container ${styles.wrapper}`}>
          <RouterProvider router={router} />
        </div>
      </AccountProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Main />
);
