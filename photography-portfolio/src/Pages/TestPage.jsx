import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import img1 from "../assets/images/title_cheez.png";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { useSmoothScrollContext } from "../contexts/SmoothScrollContext";
import AboutSection from "../components/AboutSection";
import PortfolioSection from "./PortfolioSection";
import ExhibitionSection from "./ExhibitionSection";
import jiriImg from "../assets/images/that-cheez.jpg";

const TestPage = () => {
  const sections = [
    "#landing-section",
    "#about",
    "#photography",
  ];

  const { scrollToSection } = useSmoothScrollContext();
  const { scrollContainerRef } = useSmoothScroll();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && sections.includes(hash)) {
      setIsScrolling(true);
      scrollToSection(hash, { duration: 5 });
    }

    const handleScroll = () => {
      if (isScrolling) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > 90 && currentScrollY > lastScrollY) {
        // Scroll Down
        setIsScrolling(true);
        const nextSectionIndex = (currentSectionIndex + 1) % sections.length;
        setCurrentSectionIndex(nextSectionIndex);
        const nextSection = sections[nextSectionIndex];
        smoothScrollTo(sections[nextSectionIndex], 1000, () => {
          setIsScrolling(false);
          setLastScrollY(window.scrollY);
          history.replaceState(null, null, `${nextSection}`);
        });
      } else if (currentScrollY > 90 && currentScrollY < lastScrollY) {
        // Scroll Up
        setIsScrolling(true);
        const nextSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
        setCurrentSectionIndex(nextSectionIndex);
        const nextSection = sections[nextSectionIndex];
        smoothScrollTo(sections[nextSectionIndex], 1000, () => {
          setIsScrolling(false);
          setLastScrollY(window.scrollY);
          history.replaceState(null, null, `${nextSection}`);
        });
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentSectionIndex, isScrolling, lastScrollY, sections, scrollToSection]);

  const handleBtnClick = (sectionId) => {
    navigate(sectionId);
    if (!scrollToSection(sectionId, { duration: 5 })) return;
  };

  useEffect(() => {
    if (location.hash) {
      scrollToSection(location.hash, { duration: 5 });
    }
  }, [location, scrollToSection]);

  return (
    <Box
      ref={scrollContainerRef}
      data-scroll-container
      style={{ height: "100vh" }}
      overflowX={{ base: "hidden", lg: "visible" }}
    >
      <Box id="landing-section" data-scroll-section>
        <Box height="100vh" position="relative" aspectRatio={{ base: "1 / 1", lg: "auto" }}>
          <Image src={jiriImg} alt="landing-page" objectFit={"cover"} w={{ base: "100%" }} h={{ base: "100%" }} />
          <Button
            left={{ base: "75px", lg: "60px" }}
            bottom={"100px"}
            borderRadius={"0px"}
            minW={"220px"}
            minH={"50px"}
            fontSize={"22px"}
            paddingY={"16px"}
            paddingX={"32px"}
            onClick={() => handleBtnClick("/photography")}
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
          <Text position="absolute" zIndex={1} textAlign={"center"} top={"60px"} left={"60px"} color="white" display={{ base: "block", lg: "none" }} fontSize={{ base: "45px", lg: "105px" }} lineHeight={{ base: "45px", lg: "105px" }}>
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
      <Box id="about" data-scroll-section style={{ height: "100vh", backgroundColor: "white", color: "black" }}>
        <AboutSection />
      </Box>
      <Box id="photography" data-scroll-section style={{ height: "100vh", backgroundColor: "white", color: "white" }}>
        <PortfolioSection />
      </Box>
    </Box>
  );
};

const smoothScrollTo = (selector, duration, callback) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      if (callback) callback();
    }
  };

  requestAnimationFrame(animation);
};

export default TestPage;
