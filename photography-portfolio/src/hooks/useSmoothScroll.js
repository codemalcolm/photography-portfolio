import { useEffect, useRef } from "react";

const useSmoothScroll = () => {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    const initLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
      });

      locomotiveScrollRef.current = locomotiveScroll;

      return () => {
        locomotiveScroll.destroy();
      };
    };

    initLocomotiveScroll();
  }, []);

  const scrollTo = (target, options = {}) => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(target, options);
    }
  };

  return { scrollRef, scrollTo, locomotiveScrollRef };
};

export default useSmoothScroll;