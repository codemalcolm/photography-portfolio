import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { EmblaCarousel } from "../components/Carousel";
import img1 from "../assets/images/roadsigns2.jpg";
const HeroPage = () => {
	return (
		<Box
			w={"100vw"}
			h={"100vh"}
			overflow={"hidden"}
			top={0}
			left={0}
		>
				<Image
				src={img1}
				h={"100%"}
				w={"100%"}
				objectFit={"cover"}
				objectPosition={"center"}
			/>
		</Box>
	);
};

export default HeroPage;
