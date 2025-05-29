import { Outlet, Route, Routes, useParams } from "react-router-dom";
import React from "react";
import Gallery from "../components/Gallery";
import { CollectionCacheProvider } from "../Providers/CollectionCacheContext";

const BackArrow = React.lazy(() => import("../components/BackArrow"));
const CollectionList = React.lazy(() => import("../components/CollectionList"));

const CollectionPage = () => {

  return (
    <>
      <BackArrow />
      <CollectionCacheProvider>
		<Outlet/>
      </CollectionCacheProvider>
    </>
  );
};

export default CollectionPage;
