import React from "react";
import ReactDOM from "react-dom/client";

import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/routes";
import styles from "@/main.module.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className={`container ${styles.wrapper}`}>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
