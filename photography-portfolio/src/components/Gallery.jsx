import React, { useEffect, useState } from "react";
import useFetchPhotosByIds from "../hooks/useFetchPhotosByIds";
import useGetCollectionName from "../hooks/PhotoCollection/useGetCollectionName";
import useFetchPhotoIdsByCollection from "../hooks/PhotoCollection/useFetchPhotoIdsByCollection";
import { Box, Flex } from "@chakra-ui/react";
import gridIcon from "../assets/icons/grid-icon.svg"
import carouselIcon from "../assets/icons/carousel-icon.svg"
import { useParams } from "react-router-dom";

const Gallery = (props) => {
	const {categoryId} = props
	const { collectionId } = useParams(); // Get collectionId from URL params
	// const collectionId = "1XpHp9mPSbghndA2zuEc";

	const { photoIds, isLoading, error } =
		useFetchPhotoIdsByCollection(collectionId); // Fetch the specific collection

	const { collectionName, loading: nameLoading, error: nameError,
	} = useGetCollectionName(collectionId);

	const { photos, loading: photosLoading, error: photosError,
	} = useFetchPhotosByIds(photoIds);

	const [slideIndex, setSlideIndex] = useState(1);

	const [isGalleryShown, setIsGalleryShown] = useState(true);

	useEffect(() => {
		showDivs(slideIndex);

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

	// toggling the display of gallery¬
	const galleryToggle = () =>{
		let gallery = document.getElementById("gallery")
		if(gallery.classList.contains("is-hidden")){
			gallery.classList.remove("is-hidden")
			gallery.classList.add("is-visible")
			setIsGalleryShown(true)
		}else {
			gallery.classList.remove("is-visible")
			gallery.classList.add("is-hidden")
			setIsGalleryShown(false)
		}
	}

	// toggling the display of slideshow
	const slideShowToggle = () => {

		let slideShow = document.getElementById("slideshow")
		if(slideShow.classList.contains("is-hidden")){
			slideShow.classList.remove("is-hidden")
			slideShow.classList.add("is-visible")
		}else {
			slideShow.classList.remove("is-visible")
			slideShow.classList.add("is-hidden")
		}
		galleryToggle()

	}

	const showDivs = (n) => {
		setSlideIndex(n); // Update slide index when a thumbnail is clicked
	};



	return (
		<>
			<div className="container">
				<div className="top">TOP</div>
				<div className="bottom"><img style={{color:"white", cursor:"pointer"}} src={isGalleryShown ? carouselIcon : gridIcon} onClick={() => slideShowToggle()}/></div>
				<div className="wrapper-focuser is-hidden" id="slideshow">
					<div className="prev-card" onClick={() => plusDivs(-1)}></div>
					<div className="next-card" onClick={() => plusDivs(1)}></div>

					{/* Image Carousel */}
					<div id="images" className="carousel fade">
						{photos.map((photo, index) => (
							<div
								className="card slide fade"
								key={photo.id}
								style={{
									display: slideIndex === index + 1 ? "flex" : "none",
									height: "100%",
									justifyContent: "center",
									alignItems: "center",
									padding:"8px"
								}}
							>
								<img className="picture" src={!photo.url.big ? photo.url.small : photo.url.big} alt="" />
							</div>
						))}
					</div>
				</div>
				<div className="thumbnails is-visible" id="gallery" >
					<span className="scrolling-wrapper">
						<div className="gallery-index">
							{photos.map((photo, index) => (
								<img
									className="thumbnail"
									src={photo.url.small}
									alt={photo.name}
									key={photo.id}
									onClick={() => {showDivs(index + 1); slideShowToggle()}}
								/>
							))}
						</div>
					</span>
				</div>
			</div>
		</>
	);
};

export default Gallery;

// <Box width="100%" height="100%" minHeight="100vh" zIndex={999}>
{
	/* <Flex justifyContent={"center"} flexDirection={"row"}>
        <Box color={"white"} width={"450px"}>
            Sidebar
        </Box> */
}
{
	/* grid--main */
}
{
	/* <div className="gallery"> 
            { photos.map((photo) => (
                // grid__item-container
                <div className="pic" key={photo.id}>
                    <img className="img-lol" key={photo.id} src={photo.url} fetchpriority='high'/>
                </div>
            ))}

        </div> */
}
{
	/* </Flex> */
}

// </Box>
