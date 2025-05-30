import { useEffect, useState } from "react";
import useGetCollectionName from "../hooks/PhotoCollection/useGetCollectionName";
import gridIcon from "../assets/icons/grid-icon.svg";
import carouselIcon from "../assets/icons/carousel-icon.svg";
import { useParams } from "react-router-dom";
import { Center, Spinner, Text } from "@chakra-ui/react";
import useFetchPhotosByCollection from "../hooks/useFetchPhotosByCollection";

const Gallery = () => {
  const { collectionId } = useParams(); // Get collectionId from URL params

  // Fetch photos
  const { photos, isLoading } = useFetchPhotosByCollection(collectionId);

  // Fetch collection name with caching
  const {
    collectionName,
    isLoading: nameLoading,
    error: nameError,
  } = useGetCollectionName(collectionId);

  const [slideIndex, setSlideIndex] = useState(1);
  const [isGalleryShown, setIsGalleryShown] = useState(true);

  // Lazy load big URLs when the slideshow is opened
  const [bigPhotoUrls, setBigPhotoUrls] = useState(null);

  useEffect(() => {
    const handleKeyup = (e) => {
      const key = e.keyCode || e.which;
      if (key === 37) plusDivs(-1); // Left arrow
      if (key === 39) plusDivs(1); // Right arrow
    };

    document.addEventListener("keyup", handleKeyup);
    return () => {
      document.removeEventListener("keyup", handleKeyup); // Cleanup on unmount
    };
  }, [slideIndex]);

  const plusDivs = (n) => {
    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + n;
      if (newIndex < 1) newIndex = photos.length; // Loop back to last slide
      if (newIndex > photos.length) newIndex = 1; // Loop back to first slide
      return newIndex;
    });
  };

  const galleryToggle = () => {
    const gallery = document.getElementById("gallery");
    gallery.classList.toggle("is-hidden");
    gallery.classList.toggle("is-visible");
    setIsGalleryShown((prev) => !prev);
  };

  const slideShowToggle = () => {
    const slideShow = document.getElementById("slideshow");
    slideShow.classList.toggle("is-hidden");
    slideShow.classList.toggle("is-visible");
    galleryToggle();

    // Lazy load big images when the slideshow is opened for the first time
    if (!bigPhotoUrls) {
      const urls = photos.map((photo) => ({
        id: photo.id,
        big: photo.url.big,
      }));
      setBigPhotoUrls(urls);
    }
  };

  const sortedPhotos = photos?.sort((a, b) => a.order - b.order);

  if (isLoading || nameLoading) {
  return (
    <Center height="75vh">
      <Spinner size="md" color="white"/>
    </Center>
  );
}

  return (
    <div className="container">
      <div className="top">
        <Text fontSize={32}>{collectionName || "Gallery"}</Text>
      </div>
      <div className="bottom">
        <img
          style={{ color: "white", cursor: "pointer" }}
          src={isGalleryShown ? carouselIcon : gridIcon}
          onClick={slideShowToggle}
          alt="Toggle view"
        />
      </div>

      {/* Slideshow */}
      <div className="wrapper-focuser is-hidden" id="slideshow">
        <div className="prev-card" onClick={() => plusDivs(-1)}></div>
        <div className="next-card" onClick={() => plusDivs(1)}></div>
        <div id="images" className="carousel fade">
          {sortedPhotos?.map((photo, index) => (
            <div
              className="card slide fade"
              key={photo.id}
              style={{
                display: slideIndex === index + 1 ? "flex" : "none",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px",
              }}
            >
              <img
                className="picture"
                src={
                  bigPhotoUrls
                    ? bigPhotoUrls.find((bigPhoto) => bigPhoto.id === photo.id)
                        ?.big
                    : photo.url.small
                }
                alt={"Image slideshow big version"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="thumbnails is-visible" id="gallery">
        <span className="scrolling-wrapper">
          <div className="gallery-index">
            {sortedPhotos?.map((photo, index) => (
              <img
                className="thumbnail"
                src={photo.url.small}
                alt={photo.name}
                key={photo.id}
                onClick={() => {
                  setSlideIndex(index + 1);
                  slideShowToggle();
                }}
              />
            ))}
          </div>
        </span>
      </div>
    </div>
  );
};

export default Gallery;
