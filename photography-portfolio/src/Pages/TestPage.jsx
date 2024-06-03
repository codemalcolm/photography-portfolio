import { Box, Button } from "@chakra-ui/react";
import img1 from "../assets/images/roadsigns3.jpg";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { useEffect, useState } from "react";
import { useSmoothScrollContext } from "../contexts/SmoothScrollContext"
import AboutSection from "../components/AboutSection";

const TestPage = () => {
  const sections = ["#landing-section", "#first-section", "#second-section", "#third-section"];

    const { scrollToSection } = useSmoothScrollContext();
    const { scrollContainerRef} = useSmoothScroll();
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    // useEffect(() => {
    //   const handleScroll = () => {
    //     if (isScrolling) return;
  
    //     const currentScrollY = window.scrollY;
  
    //     // Check if the user has scrolled past the threshold and hasn't scrolled back up
    //     if (currentScrollY > 40 && currentScrollY > lastScrollY) {
    //       setIsScrolling(true);
    //       const nextSectionIndex = (currentSectionIndex + 1) % sections.length;
    //       setCurrentSectionIndex(nextSectionIndex);
    //       smoothScrollTo(sections[nextSectionIndex], 1000, () => {
    //         setIsScrolling(false); // Reset scrolling state once animation is done
    //         setLastScrollY(window.scrollY); // Update lastScrollY to the current scroll position
    //       });
    //     }
  
    //     setLastScrollY(currentScrollY);
    //   };
  
    //   window.addEventListener("scroll", handleScroll);
  
    //   return () => {
    //     window.removeEventListener("scroll", handleScroll);
    //   };
    // }, [currentSectionIndex, isScrolling, lastScrollY, sections]);

  return (
    <Box
      ref={scrollContainerRef}
      data-scroll-container
      style={{ height: "100vh"}}
    >

      <Box
        id="landing-section"
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
        <h1>Portfolio Section</h1>
      </Box>

      <Box
        id="second-section"
        data-scroll-section
        style={{ height: "100vh", backgroundColor: "white", color: "black" }}
      >
        <AboutSection/>
      </Box>

      <Box
        id="third-section"
        data-scroll-section
        style={{ height: "100vh", backgroundColor: "red", color: "white" }}
      >
        <h1>Exhibitions Section</h1>
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
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      if (callback) callback(); // Call the callback function after the animation is done
    }
  };

  requestAnimationFrame(animation);
};


export default TestPage;
