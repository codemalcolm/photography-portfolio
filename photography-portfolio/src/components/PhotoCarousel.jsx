import { Box, Button, Flex, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GrGallery } from "react-icons/gr";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarousel/ArrowButtons.jsx";
import useEmblaCarousel from "embla-carousel-react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { color } from "framer-motion";
import LazyImage from "./LazyImage.jsx";
import useFetchPhotosByIds from "../hooks/useFetchPhotosByIds.js";
import useFetchPhotoIdsByCollection from "../hooks/PhotoCollection/useFetchPhotoIdsByCollection.js";
import useGetCollectionName from "../hooks/PhotoCollection/useGetCollectionName.js";

const PhotoCarousel = (props) => {
	const {categoryId} = props
	const { collectionId } = useParams(); // Get collectionId from URL params
	console.log(categoryId)
	const { photoIds, isLoading, error } = useFetchPhotoIdsByCollection(collectionId); // Fetch the specific collection
	const {collectionName, loading: nameLoading, error : nameError } = useGetCollectionName(collectionId)
	const { photos, loading: photosLoading, error: photosError} = useFetchPhotosByIds(photoIds);

	const [emblaRef, emblaApi] = useEmblaCarousel({loop: false});
	const [activeIndex, setActiveIndex] = useState(0);

	const navigate = useNavigate();

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	useEffect(() => {
		if (!emblaApi) return;

		const onSelect = () => {
			setActiveIndex(emblaApi.selectedScrollSnap());
		};

		emblaApi.on("select", onSelect);
		onSelect(); // Set the initial state

		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi]);

	const activeSlide = photos[activeIndex];

	const handleGoBack = () => {
		navigate(-1); // Navigate back one step
	};

	if (photosLoading) {
		return (
		  <Box
		  position="fixed" // Make sure the Box takes up the entire viewport and stays in place
		  top="0" 
		  left="0"
		  width="100vw"
		  height="100vh"
		  display="flex"
		  justifyContent="center"
		  alignItems="center"
		  backgroundColor="rgba(0, 0, 0, 0.1)" // Optional: add a translucent background
		  zIndex="1000" // Ensure the spinner stays above other content
		  transition="opacity 1s ease-in-out"
		>
		  <Spinner size="xl" />
		</Box>
		);
	  }

	return (
		<Flex width={"100%"} flexDirection={{base:"column" , lg:"row"}} justifyContent={"center"} alignItems={"center"} id={"lol"}>
			<VStack>
				<Text color={"white"} fontSize="28px" textAlign={"center"}>{collectionName}</Text>
				<Flex
					width={"40%"}
					flexDirection={"row"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					{activeSlide && (
						<VStack
							key={activeSlide.id}
							width={"250px"}
							align={"start"}
							px={"16px"}
						>
							{/* <Text fontSize="lg" fontWeight="bold">
								{activeSlide.name}
							</Text> */}
							{/* <Text fontSize="md">{activeSlide.description}</Text> */}
						</VStack>
					)}
					<Flex justifyContent={"center"} alignItems={"center"} display={{base:"none", lg:"flex"}}>
					<RouterLink to={`/photography/${categoryId}/gallery/${collectionId}`}>
						<Box
								p={4}
								_hover={{background:"none" ,color:"gray"}}
								variant={"ghost"}
								color={"white"}
							>
								<GrGallery style={{ width: "35px", height: "35px" }} />
						</Box>
					</RouterLink>
						
						<Flex alignItems={"center"} justifyContent={"center"} width={"100%"}>

							<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
							<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
						</Flex>
					</Flex>

					
					<Flex>
						<section className="embla">
							<div className="embla__viewport" ref={emblaRef}>
								<div className="embla__container">
									{photos.map((slide, index) => (
										<div className="embla__slide" key={slide.id}>
											{/* Pass the next slide's imageUrl as nextSrc */}
											<LazyImage
												src={slide.url}
												nextSrc={photos[index + 1]?.url}
												alt={slide.name}
											/>
										</div>
									))}
								</div>
								{/* <Flex position={"absolute"}>
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
					</Flex> */}
							</div>
						<Flex width={"100%"} display={{base:"flex", lg:"none"}} alignItems="center" flexDirection={"column"}>
							<Flex>

								<Flex alignItems={"center"} justifyContent={"center"} width={"100%"}>
									<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
									<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
								</Flex>

								<Button
										p={4}
										backgroundColor={""}
										onClick={() => galleryNavigation(show)}
										_hover={{background:"none" ,color:"gray"}}
										variant={"ghost"}
										color={"white"}
									>
										<GrGallery style={{ width: "35px", height: "35px" }} />
								</Button>
							</Flex>
						</Flex>

						</section>
					</Flex>
				</Flex>
			</VStack>
			

			
		</Flex>
	);
};

export default PhotoCarousel;
