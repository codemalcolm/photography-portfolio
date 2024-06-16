import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { useSmoothScrollContext } from "../contexts/SmoothScrollContext";
import AboutSection from "../components/AboutSection";
import PortfolioSection from "./PortfolioSection";
import jiriImg from "../assets/images/that-cheez.jpg";

const TestPage2 = () => {
    const sectionsRef = {
        landing: useRef(null),
        about: useRef(null),
        photography: useRef(null),
      };
    
      const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
      const [isScrolling, setIsScrolling] = useState(false);
      const [lastScrollY, setLastScrollY] = useState(0);
      const navigate = useNavigate();
      const location = useLocation();
    
      useEffect(() => {
        const handleScroll = () => {
          if (isScrolling) return;
    
          const currentScrollY = window.scrollY;
    
          if (currentScrollY > 90 && currentScrollY > lastScrollY) {
            // Scroll Down
            setIsScrolling(true);
            const nextSectionIndex = (currentSectionIndex + 1) % Object.keys(sectionsRef).length;
            setCurrentSectionIndex(nextSectionIndex);
            const nextSection = Object.keys(sectionsRef)[nextSectionIndex];
            smoothScrollTo(sectionsRef[nextSection].current);
            navigate(`#${nextSection}`);
          } else if (currentScrollY > 90 && currentScrollY < lastScrollY) {
            // Scroll Up
            setIsScrolling(true);
            const nextSectionIndex = (currentSectionIndex - 1 + Object.keys(sectionsRef).length) % Object.keys(sectionsRef).length;
            setCurrentSectionIndex(nextSectionIndex);
            const nextSection = Object.keys(sectionsRef)[nextSectionIndex];
            smoothScrollTo(sectionsRef[nextSection].current);
            navigate(`#${nextSection}`);
          }
    
          setLastScrollY(currentScrollY);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [currentSectionIndex, isScrolling, lastScrollY, sectionsRef, navigate]);
    
      const handleBtnClick = (sectionRef) => {
        smoothScrollTo(sectionRef.current);
        navigate(`#${sectionRef.current.id}`);
      };
    
      useEffect(() => {
        if (location.hash && sectionsRef[location.hash.substring(1)]) {
          smoothScrollTo(sectionsRef[location.hash.substring(1)].current);
        }
      }, [location, sectionsRef]);
    
      return (
        <Box style={{ height: "100vh" }}>
          <Box ref={sectionsRef.landing} id="landing-section" style={{ height: "100vh", position: "relative" }}>
            <Image src={jiriImg} alt="landing-page" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            <Button
              style={{ position: "absolute", left: "75px", bottom: "100px", borderRadius: "0px", minWidth: "220px", minHeight: "50px", fontSize: "22px", padding: "16px 32px" }}
              onClick={() => handleBtnClick(sectionsRef.photography)}
            >
              MY WORK
            </Button>
            {/* Other content */}
          </Box>
          <Box ref={sectionsRef.about} id="about" style={{ height: "100vh", backgroundColor: "white", color: "black" }}>
            <AboutSection />
          </Box>
          <Box ref={sectionsRef.photography} id="photography" style={{ height: "100vh", backgroundColor: "white", color: "white" }}>
            <PortfolioSection />
          </Box>
        </Box>
      );
    };

    export const smoothScrollTo = (element) => {
        if (!element) return;
      
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // Adjust duration as needed
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
          }
        };
      
        requestAnimationFrame(animation);
      };
export default TestPage2;
