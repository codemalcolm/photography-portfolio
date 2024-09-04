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
import { color } from "framer-motion";

const PhotoCarousel = (props) => {
	const { slides, options, show } = props;
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

	const galleryNavigation = (show) => {
		navigate(`/photography/${show.type}/gallery/${show.id}`); // Navigate to the gallery with specific ID
	};

	return (
		<Flex width={"100%"} flexDirection={{base:"column" , lg:"row"}} justifyContent={"center"} alignItems={"center"} id={"lol"}>
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
					<Text width={"150px"} textAlign={"start"}>{show.collectionName}</Text>
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
					<Flex alignItems={"center"} justifyContent={"center"} width={"100%"}>

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
									<Image loading={"lazy"} src={slide.imageUrl} />
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
						<Text width={"150px"} textAlign={"start"}>{show.collectionName}</Text>
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

			
		</Flex>
	);
};

export default PhotoCarousel;
