import React, { useState, useEffect, useRef } from "react";

// Throttle function to prevent excessive callback invocations
function throttle(fn, wait) {
  let time = Date.now();
  return function (...args) {
    if (time + wait - Date.now() < 0) {
      fn(...args);
      time = Date.now();
    }
  };
}

// Function to check if an element is within the viewport
const isElementInViewport = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const LazyImage = ({ src, nextSrc, alt,}) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const checkVisibility = () => {
      if (imageRef.current) {
        setIsVisible(isElementInViewport(imageRef.current));
      }
    };

    // Check visibility on mount
    checkVisibility();

    const observer = new IntersectionObserver(
      throttle((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once the image is visible
        }
      }, 200), // Throttle the callback
      { threshold: 0.1 } // Trigger when 10% of the image is in view
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Preload the next two images if they exist
      [nextSrc].forEach((src) => {
        if (src) {
          const img = new Image();
          img.src = src;
        }
      });
    }
  }, [isVisible, nextSrc]);

  return (
    <img
      ref={imageRef}
      src={isVisible ? src : undefined}
      alt={alt || ""}
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.2s ease" }} // Add smooth fade-in
      loading="lazy"
    />
  );
};

export default LazyImage;


