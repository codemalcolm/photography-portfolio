import { Box } from "@chakra-ui/react";
import Carousel from "../components/Carousel";

const HomePage = () => {
	return (
		<>
			<Box
				style={{ height: "100vh" }}
				overflowX={{ base: "hidden", lg: "visible" }}
				overflowY={{ base: "hidden", lg: "hidden" }}
				fontFamily={"Teko"}
				overflow={"hidden"}
			>
				<Carousel />
			</Box>
		</>
	);
};

export default HomePage;
