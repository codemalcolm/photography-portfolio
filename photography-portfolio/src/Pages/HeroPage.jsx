import { Box, Button, Image, Text } from "@chakra-ui/react";
import img1 from "../assets/images/that-cheez.jpg";
import { useEffect } from "react";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
  const navigate = useNavigate();
  const handleBtnClick = () => {
    navigate("/photography")
  }
  return (
    <Box
      style={{ height: "100vh" }}
      overflowX={{ base: "hidden", lg: "visible" }}
      overflowY={{ base: "hidden", lg: "hidden" }}
      fontFamily={"Oswald"}
    >
      <Box id="landing-section" data-scroll-section>
        <Box height="100vh" position="relative" aspectRatio={{ base: "1 / 1", lg: "auto" }}>
          <Image src={img1} alt="landing-page" objectFit={"cover"} w={{ base: "100%" }} h={{ base: "100%" }} />
          <Button
            left={{ base: "84px", lg: "60px" }}
            bottom={"100px"}
            borderRadius={"0px"}
            minW={"220px"}
            minH={"50px"}
            fontSize={"22px"}
            paddingY={"16px"}
            paddingX={"32px"}
            onClick={() => handleBtnClick()}
          >

            MY WORK
          </Button>
          <Box display={{ base: "none", lg: "block" }} position="absolute" zIndex={1} top={{ base: "45px", lg: "90px" }} left={{ base: "16px", lg: "45px" }}>
            <Text color="white" fontSize={{ base: "45px", lg: "105px" }} lineHeight={{ base: "45px", lg: "105px" }}>
              Jiří
            </Text>
            <Text color="white" fontSize={{ base: "45px", lg: "105px" }} lineHeight={{ base: "45px", lg: "105px" }}>
              Macháček
            </Text>
          </Box>
          <Text position="absolute" zIndex={1} textAlign={"center"} top={"60px"} left={"88px"} color="white" display={{ base: "block", lg: "none" }} fontSize={{ base: "45px", lg: "105px" }} lineHeight={{ base: "45px", lg: "105px" }}>
            Jiří Macháček
          </Text>
          <Box display={{ base: "none", lg: "block" }} position="absolute" zIndex={1} top="450px" right="60px">
            <Text color="white" fontSize="65px" lineHeight="65px">
              Photography
            </Text>
            <Text color="white" fontSize="40px" lineHeight="40px">
              Portfolio
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroPage;
