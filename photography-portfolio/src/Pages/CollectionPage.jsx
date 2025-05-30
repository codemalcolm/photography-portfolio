import { Outlet } from "react-router-dom";
import React from "react";
import { CollectionCacheProvider } from "../Providers/CollectionCacheContext";

const BackArrow = React.lazy(() => import("../components/BackArrow"));

const CollectionPage = () => {
  return (
    <>
      <BackArrow />
      <CollectionCacheProvider>
        <Outlet />
      </CollectionCacheProvider>
    </>
  );
};

export default CollectionPage;
