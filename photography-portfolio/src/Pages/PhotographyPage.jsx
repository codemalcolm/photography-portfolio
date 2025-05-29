import React from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
const Categories = React.lazy(() => import("../components/Categories"));
const CollectionPage = React.lazy(() => import("./CollectionPage"));

const PhotographyPage = () => {
  return (
    <Box
      style={{ height: "100vh" }}
      bg="#101118"
      overflowY="hidden"
      color="white"
      fontWeight={700}
      fontFamily="Teko"
    >
      <Categories />
    </Box>
  );
};

export default PhotographyPage;
