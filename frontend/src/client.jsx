import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { ThemeProvider } from "./features/themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";

// Lazy load other pages
const Contacts = lazy(() => import("./pages/Contacts"));
const ContactsNew = lazy(() => import("./pages/ContactsNew"));
const Companies = lazy(() => import("./pages/Companies"));
const Tickets = lazy(() => import("./pages/Tickets"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/contacts",
        element: (
          <Suspense fallback={<div className="p-3">Loading...</div>}>
            <Contacts />
          </Suspense>
        ),
      },
      {
        path: "/contacts/new",
        element: (
          <Suspense fallback={<div className="p-3">Loading...</div>}>
            <ContactsNew />
          </Suspense>
        ),
      },
      {
        path: "/companies",
        element: (
          <Suspense fallback={<div className="p-3">Loading...</div>}>
            <Companies />
          </Suspense>
        ),
      },
      {
        path: "/tickets",
        element: (
          <Suspense fallback={<div className="p-3">Loading...</div>}>
            <Tickets />
          </Suspense>
        ),
      },
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
