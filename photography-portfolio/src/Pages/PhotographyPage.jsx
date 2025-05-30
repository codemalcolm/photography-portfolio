import React from "react";
import { Box } from "@chakra-ui/react";
const Categories = React.lazy(() => import("../components/Categories"));

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
