import React, { createContext, useContext } from "react";
import useSmoothScroll from "../hooks/useSmoothScroll";

const SmoothScrollContext = createContext();

export const SmoothScrollProvider = ({ children }) => {
  const { scrollContainerRef, scrollToSection } = useSmoothScroll();

  return (
    <SmoothScrollContext.Provider value={{ scrollContainerRef, scrollToSection }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScrollContext = () => {
  return useContext(SmoothScrollContext);
};
