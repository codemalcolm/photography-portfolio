import React, { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";

const Carousel = () => {
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/photos%2Fbig%2F_1260256-Edit.webp?alt=media&token=8edc6e58-415e-4517-bde4-9cfee9a989f2",
    "https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/photos%2Fbig%2F_1260261-Edit.webp?alt=media&token=1091404e-8e89-4563-a548-52d6e9e4fd14",
    "https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/photos%2Fbig%2F_1270634-Edit-Edit.webp?alt=media&token=61818e59-4f2e-43f8-9dcc-5158645676f2",
    "https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/photos%2Fbig%2F_1290434-Edit1.webp?alt=media&token=1df81574-b7e5-43a7-979b-2bf75a92fcc4",
    "https://firebasestorage.googleapis.com/v0/b/jirimachacek-photography.appspot.com/o/photos%2Fbig%2F_1270761-Edit.webp?alt=media&token=3c9bd202-f3e0-4289-85c0-96c7c82c0a26",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <Box
      w="100vw"
      h="100vh"
      position="relative"
      overflow="hidden"
      bg="black" // Black background while images load
    >
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Carousel Image ${index + 1}`}
          objectFit="cover"
          w="100%"
          h="100%"
          position="absolute"
          top="0"
          left="0"
          opacity={currentIndex === index && isFirstImageLoaded ? 1 : 0}
          transition="opacity 1s ease-in-out"
          visibility={isFirstImageLoaded ? "visible" : "hidden"} // Hide until the first image is fully loaded
          objectPosition="center"
          onLoad={() => {
            // Set a flag once the first image has fully loaded
            if (index === 0) setIsFirstImageLoaded(true);
          }}
        />
      ))}
    </Box>
  );
};

export default Carousel;