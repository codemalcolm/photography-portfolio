import React, { createContext, useContext } from "react";
import useSmoothScroll from "../hooks/useSmoothScroll";

const SmoothScrollContext = createContext();

export const SmoothScrollProvider = ({ children }) => {
  const smoothScroll = useSmoothScroll();

  return (
    <SmoothScrollContext.Provider value={smoothScroll}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScrollContext = () => {
  return useContext(SmoothScrollContext);
};
