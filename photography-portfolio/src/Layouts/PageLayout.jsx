import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navigation/Navbar";
import useSmoothScroll from "../hooks/useSmoothScroll";

const PageLayout = ({ children }) => {
  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Navbar />
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
