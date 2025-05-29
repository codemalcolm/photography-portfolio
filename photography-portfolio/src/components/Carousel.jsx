import { useState, useEffect } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import useFetchPhotosByCollection from "../hooks/useFetchPhotosByCollection";

const Carousel = () => {
  const { photos, isLoading } = useFetchPhotosByCollection("hZFA0TZe3V315hW5Gm09");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [isInitialRender, setIsInitialRender] = useState(true);

  const sortedPhotos = photos?.sort((a, b) => a.order - b.order);

  // Preload given image index (used for next image)
  const preloadImage = (index) => {
    const url = sortedPhotos?.[index]?.url?.big;
    if (!url || loadedImages[index]) return;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };
  };

  useEffect(() => {
    if (!sortedPhotos || sortedPhotos.length === 0) return;

    // Preload the next image
    const nextIndex = (currentIndex + 1) % sortedPhotos.length;
    preloadImage(nextIndex);

    // Start interval once the first image has been loaded
    if (!isInitialRender) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sortedPhotos.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, sortedPhotos, loadedImages, isInitialRender]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));

    if (index === 0 && isInitialRender) {
      setIsInitialRender(false); // start carousel once first image is ready
    }
  };

  return (
    <Box w="100vw" h="100vh" position="relative" overflow="hidden">
      {isLoading ? (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="1000"
        >
          <Spinner size="md" color="white" />
        </Box>
      ) : (
        sortedPhotos.map((photo, index) => {
          const imageUrl = photo.url.big;
          const isVisible = currentIndex === index && loadedImages[index];

          return (
            <img
              key={index}
              src={imageUrl}
              onLoad={() => handleImageLoad(index)}
              alt={`Carousel Image ${index + 1}`}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: isVisible ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            />
          );
        })
      )}
    </Box>
  );
};

export default Carousel;
