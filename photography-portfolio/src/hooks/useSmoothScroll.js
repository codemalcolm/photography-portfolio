// import { useEffect, useRef } from "react";

// const useSmoothScroll = () => {
// 	const scrollContainerRef = useRef(null);
// 	const locomotiveScrollRef = useRef(null);

// 	useEffect(() => {
// 		// import "locomotive-scroll" when DOM is mounted
// 		const initLocomotiveScroll = async () => {
// 			const LocomotiveScroll = (await import("locomotive-scroll")).default;
// 			const locomotiveScroll = new LocomotiveScroll({
// 				el: scrollContainerRef.current,
// 				smooth: true,
// 			});

// 			locomotiveScrollRef.current = locomotiveScroll;

// 			return () => {
// 				locomotiveScroll.destroy();
// 			};
// 		};

// 		if (scrollContainerRef.current) {
// 			initLocomotiveScroll();
// 		}

// 		return () => {
// 			if (locomotiveScrollRef.current) {
// 				locomotiveScrollRef.current.destroy();
// 			}
// 		};
// 	}, []);

// 	// Scroll function
// 	const scrollToSection = (section, options = {
//      duration: 1.5 
//     }) => {
// 		if (!locomotiveScrollRef.current) return;
//       console.log(section)
// 		locomotiveScrollRef.current.scrollTo(section, options);
// 	};

// 	return { scrollContainerRef, scrollToSection };
// };

// export default useSmoothScroll;
import { useRef } from "react";

const useSmoothScroll = () => {
  const scrollContainerRef = useRef(null);

  const scrollToSection = (sectionId, options = {}) => {

    const section = document.querySelector(sectionId);
    if (section) {
     
      section.scrollIntoView({ behavior: "smooth", ...options });
      return true;
    }
    return false;
  };

  return { scrollContainerRef, scrollToSection };
};

export default useSmoothScroll;
