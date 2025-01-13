import { Box, Image } from "@chakra-ui/react";
import Carousel from "../components/Carousel";

const HeroPage = () => {
	return (
		<>
			<Box
				style={{ height: "100vh" }}
				overflowX={{ base: "hidden", lg: "visible" }}
				overflowY={{ base: "hidden", lg: "hidden" }}
				fontFamily={"Oswald"}
			>
				<Carousel />
			</Box>
		</>
	);
};

export default HeroPage;
