import { Box, Image } from "@chakra-ui/react";
import img1 from "../assets/images/that-cheez.webp";

const HeroPage = () => {
	return (
		<>
			<Box
				style={{ height: "100vh" }}
				overflowX={{ base: "hidden", lg: "visible" }}
				overflowY={{ base: "hidden", lg: "hidden" }}
				fontFamily={"Oswald"}
			>
				<Box id="landing-section" fontdisplay="swap">
					<Box
						height="100vh"
						position="relative"
						aspectRatio={{ base: "1 / 1", lg: "auto" }}
					>
						<Image
							fetchpriority="high"
							src={img1}
							alt="landing-page"
							objectFit={"cover"}
							w={{ base: "100%" }}
							h={{ base: "100%" }}
						/>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default HeroPage;
