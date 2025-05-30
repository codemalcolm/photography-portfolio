import { useState, useEffect, useRef } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import useFetchPhotosByCollection from "../hooks/useFetchPhotosByCollection";

const Carousel = () => {
  const { photos, isLoading } = useFetchPhotosByCollection("hZFA0TZe3V315hW5Gm09");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [isInitialRender, setIsInitialRender] = useState(true);

  const sortedPhotos = photos?.sort((a, b) => a.order - b.order);
  const totalPhotos = sortedPhotos?.length || 0;

  const intervalRef = useRef(null);

  // === Preload image at a given index if not already loaded ===
  const preloadImage = (index) => {
    if (!sortedPhotos || index >= totalPhotos || index < 0) return;

    const url = sortedPhotos[index]?.url?.big;
    if (!url || loadedImages[index]) return;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };
  };

  // === Initial image preload (index 0 + 1) ===
  useEffect(() => {
    if (!sortedPhotos || totalPhotos === 0) return;

    preloadImage(0); // first image
    preloadImage(1); // next image
  }, [sortedPhotos]);

  // === Transition effect ===
  useEffect(() => {
    if (!sortedPhotos || totalPhotos === 0 || isInitialRender) return;

    // Preload next image
    const nextIndex = (currentIndex + 1) % totalPhotos;
    preloadImage(nextIndex);

    // Set up interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPhotos);
    }, 6000);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, sortedPhotos, loadedImages, isInitialRender]);

  // === Handle image load (ensures animation starts) ===
  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
    if (index === 0 && isInitialRender) {
      setIsInitialRender(false);
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

          // Optionally: only render images near the viewport (current ± 1)
          const shouldRender = Math.abs(currentIndex - index) <= 1 || index === 0;

          return shouldRender ? (
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
          ) : null;
        })
      )}
    </Box>
  );
};

export default Carousel;
