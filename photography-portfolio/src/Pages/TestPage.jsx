import { Box, Button } from "@chakra-ui/react";
import img1 from "../assets/images/roadsigns3.jpg";
import useSmoothScroll from "../hooks/useSmoothScroll";

const TestPage = () => {

    const { scrollContainerRef, scrollToSection } = useSmoothScroll();

  return (
    <Box
      ref={scrollContainerRef}
      data-scroll-container
      style={{ height: "100vh"}}
    >
      <Box
        data-scroll-section
        style={{ height: "100vh", backgroundColor: "black" }}
      >
        <img src={img1} alt="Landing" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>
      <Box
        id="first-section"
        data-scroll-section
        style={{ height: "100vh", backgroundColor: "blue", color: "white" }}
      >
        <h1>First Section</h1>
        <Button onClick={() => scrollToSection("#first-section")}>Scroll to Next Section</Button>
      </Box>
      <Box
        id="second-section"
        data-scroll-section
        style={{ height: "100vh", backgroundColor: "red", color: "white" }}
      >
        <h1>Second Section</h1>
        <Button onClick={() => scrollToSection("#first-section")}>Scroll to Next Section</Button>
      </Box>
    </Box>
  );
};

export default TestPage;
