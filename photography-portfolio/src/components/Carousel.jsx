import { useState, useEffect } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import useFetchPhotosByCollection from "../hooks/useFetchPhotosByCollection";

const Carousel = () => {
  const { photos, isLoading } = useFetchPhotosByCollection(
    "hZFA0TZe3V315hW5Gm09"
  ); // Fetch the specific collection

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({ 0: true }); // Only the first image is preloaded initially

  // Sorting photos based on the 'order' field
  const sortedPhotos = photos?.sort((a, b) => a.order - b.order);

  // Preload the next image when the current one is active
  const preloadImage = (index) => {
    const img = new Image();
    const bigUrl = sortedPhotos[index]?.url?.big; // Access the 'big' URL from the object
    if (bigUrl) {
      img.src = bigUrl;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
      };
    }
  };

  useEffect(() => {
    // Preload the next image once the carousel starts
    const nextIndex = (currentIndex + 1) % sortedPhotos.length;
    if (!loadedImages[nextIndex]) {
      preloadImage(nextIndex);
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedPhotos.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex, sortedPhotos, loadedImages, isLoading]);

  return (
    <Box w="100vw" h="100vh" position="relative" overflow="hidden">
      {isLoading ? (
        <Box
          position="fixed" // Make sure the Box takes up the entire viewport and stays in place
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="1000" // Ensure the spinner stays above other content
          transition="opacity 1s ease-in-out"
        >
          <Spinner size="md" color="white" />
        </Box>
      ) : (
        sortedPhotos.map((photo, index) => {
          const imageUrl = loadedImages[index] ? photo.url.big : undefined; // Use the 'big' image URL
          return (
            <img
              key={index}
              src={imageUrl}
              alt={`Carousel Image ${index + 1}`}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: currentIndex === index ? 1 : 0,
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
