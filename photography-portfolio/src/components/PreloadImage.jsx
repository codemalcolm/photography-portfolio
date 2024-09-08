import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PreloadImage = () => {
  const location = useLocation();

  useEffect(() => {
    const head = document.head;
    const preloadLink = document.querySelector("link[rel='preload'][as='image']");

    if (location.pathname === "/") {
      // If on the landing page, add the preload link
      if (!preloadLink) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = "../assets/images/that-cheez.webp";
        link.as = "image";
        head.appendChild(link);
      }
    } else {
      // If not on the landing page, remove the preload link
      if (preloadLink) {
        head.removeChild(preloadLink);
      }
    }
  }, [location]);

  return null; // This component does not render any UI
};

export default PreloadImage;