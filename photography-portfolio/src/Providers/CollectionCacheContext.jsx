import React, { createContext, useContext, useState } from "react";

const CollectionCacheContext = createContext();

export const CollectionCacheProvider = ({ children }) => {
  const [cache, setCache] = useState({});

  const addToCache = (key, value) => {
    setCache((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CollectionCacheContext.Provider value={{ cache, addToCache }}>
      {children}
    </CollectionCacheContext.Provider>
  );
};

export const useCollectionCache = () => useContext(CollectionCacheContext);
