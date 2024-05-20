import { Box, Image } from "@chakra-ui/react";
import img1 from "../assets/images/roadsigns2.jpg";
import { useEffect } from "react";
import useSmoothScroll from "../hooks/useSmoothScroll";

const HeroPage = () => {
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the threshold as needed
      if (window.scrollY > 50) {
        scrollTo("#contact-section", {
          duration: 1000,
          easing: [0.25, 0.00, 0.35, 1.00],
        });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTo]);

  return (
    <Box margin={0} data-scroll-container>
      <Box w={"100vw"} h={"100vh"} overflow={"hidden"} top={0} left={0}>
        <Image
          src={img1}
          h={"100%"}
          w={"100%"}
          objectFit={"cover"}
          objectPosition={"center"}
        />
      </Box>
      <Box
        id="contact-section"
        width={"100vw"}
        minH={"100vh"}
        backgroundColor={"blue"}
        color={"white"}
        m={0}
        overflow={"hidden"}
      >
        Contact section
      </Box>
    </Box>
  );
};

export default HeroPage;
