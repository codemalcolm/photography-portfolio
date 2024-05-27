import React, { createContext, useContext } from "react";

// Create a context for the scroll function
const SmoothScrollContext = createContext(null);

// Custom hook to access the context
export const useSmoothScrollContext = () => useContext(SmoothScrollContext);

// Context provider component
export const SmoothScrollProvider = ({ children, scrollToSection }) => {
  return (
    <SmoothScrollContext.Provider value={scrollToSection}>
      {children}
    </SmoothScrollContext.Provider>
  );
};