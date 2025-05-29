import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Flex height={"100vh"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Box textAlign={"center"} padding={"5rem"}>
        <Text fontSize={"2.5rem"} marginBottom={"1rem"} color={"white"}>
          No Page Found Here!
        </Text>
        <Text fontSize={"2rem"} color={"#ff7900"} marginBottom={"2rem"}>
          404 Error
        </Text>
        <Button
          padding={"1.25rem 2rem"}
          fontSize={"1.5rem"}
          cursor={"pointer"}
          backgroundColor={"#5fa4a4"}
          color={"#fff"}
          border={"none"}
          borderRadius={"0.5rem"}
          onClick={() => navigate("/")}
        >
          Go back to homepage
        </Button>
      </Box>
    </Flex>
  );
};


export default NotFoundPage;
