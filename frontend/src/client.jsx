import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { ThemeProvider } from "./features/themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Companies from "./pages/Companies";
import Tickets from "./pages/Tickets";
import ContactsNew from "./pages/ContactsNew";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/contacts/new", element: <ContactsNew /> },
      { path: "/companies", element: <Companies /> },
      { path: "/tickets", element: <Tickets /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
