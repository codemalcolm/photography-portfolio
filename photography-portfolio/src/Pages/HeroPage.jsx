import { Box, Button, Image, Text } from "@chakra-ui/react";
import img1 from "../assets/images/that-cheez.webp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HeroPage = () => {

  const navigate = useNavigate();
  const handleBtnClick = () => {
    navigate("/photography")
  }
  return (
    <>
      <Box
        style={{ height: "100vh" }}
        overflowX={{ base: "hidden", lg: "visible" }}
        overflowY={{ base: "hidden", lg: "hidden" }}
        fontFamily={"Oswald"}
      >
        <Box id="landing-section" fontdisplay="swap">
          <Box height="100vh" position="relative" aspectRatio={{ base: "1 / 1", lg: "auto" }}>
            <Image fetchpriority="high" src={img1} alt="landing-page" objectFit={"cover"} w={{ base: "100%" }} h={{ base: "100%" }}/>
          </Box>
        </Box>
      </Box>
    </>
   
  );
};

export default HeroPage;
