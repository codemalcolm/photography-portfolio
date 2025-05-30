import { Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import arrowBack from "../assets/icons/arrow-back-svgrepo-com.svg"; // Make sure to import your arrow image

const BackArrow = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page in the app's history
  };

  return (
    <Box mt={"36px"} mx={"32px"} onClick={handleGoBack} cursor="pointer">
      <Image width={"60px"} height={"60px"}src={arrowBack} alt="Go Back" />
    </Box>
  );
};

export default BackArrow;