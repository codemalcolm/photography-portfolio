import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GrGallery } from "react-icons/gr";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarousel/ArrowButtons.jsx";
import useEmblaCarousel from "embla-carousel-react";
import { Link, useNavigate } from "react-router-dom";

const PhotoCarousel = (props) => {
	const { slides, options, showId } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options);
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

	const activeSlide = slides[activeIndex];

	const handleGoBack = () => {
		navigate(-1); // Navigate back one step
	};

	const galleryNavigation = (id) => {
		navigate(`/photography/shows/gallery/${id}`); // Navigate to the gallery with specific ID
	};

	return (
		<Flex width={"100%"} m={"0 auto"}>
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
						<Text fontSize="lg" fontWeight="bold">
							{activeSlide.name}
						</Text>
						<Text fontSize="md">{activeSlide.description}</Text>
					</VStack>
				)}
				<Flex flexDirection={"column"}>Category</Flex>
				<Flex alignItems={"center"} justifyContent={"center"} ml={"64"}>
					<Button
						p={4}
						w={"50px"}
						backgroundColor={""}
						onClick={() => galleryNavigation(showId)}
					>
						<GrGallery style={{ width: "25px", height: "25px" }} />
					</Button>
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</Flex>
			</Flex>

			<Flex>
				<section className="embla">
					<div className="embla__viewport" ref={emblaRef}>
						<div className="embla__container">
							{slides.map((slide, index) => (
								<div className="embla__slide" key={slide.id}>
									<Image src={slide.imageUrl} />
								</div>
							))}
						</div>
						{/* <Flex position={"absolute"}>
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </Flex> */}
					</div>
				</section>
			</Flex>
		</Flex>
	);
};

export default PhotoCarousel;
