import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PageWrapper from "../Layouts/PageWrapper";

import NotFoundPage from "../Layouts/NotFoundPage";

import CollectionPage from "../Pages/CollectionPage";
import CollectionList from "../components/CollectionList";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const PhotographyPage = React.lazy(() =>
  import("../Pages/PhotographyPage.jsx")
);
const AboutPage = React.lazy(() => import("../Pages/AboutPage.jsx"));
const HomePage = React.lazy(() => import("../Pages/HomePage.jsx"));
const ImagePicker = React.lazy(() => import("../components/ImagePicker.jsx"));
const ContactPage = React.lazy(() => import("../Pages/ContactPage.jsx"));
const AuthPage = React.lazy(() => import("../Pages/AuthPage.jsx"));
const Gallery = React.lazy(() => import("../components/Gallery"));
import { auth } from "../firebase/firebase.js";

export const Router = () => {
  const [authUser] = useAuthState(auth);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageWrapper />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "contact", element: <ContactPage /> },

        {
          path: "/auth",
          element: !authUser ? <AuthPage /> : <Navigate to="/image-picker" />,
        },
        {
          path: "/image-picker",
          element: authUser ? <ImagePicker /> : <Navigate to="/auth" />,
        },
        {
          path: "photography",
          children: [
            { path: "", element: <PhotographyPage /> }, // works
            {
              path: ":categoryId/",
              element: <CollectionPage />, // works
              children: [
                {
                  path: "",
                  element: <CollectionList />,
                },
                {
                  path: "gallery/:collectionId/",
                  element: <Gallery />,
                },
              ],
            },
          ],
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
