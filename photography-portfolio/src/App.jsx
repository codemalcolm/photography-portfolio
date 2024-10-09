import React, { Suspense } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	BrowserRouter,
} from "react-router-dom";
import PreloadImage from "./components/PreloadImage";

// Lazy loading imports
const PortfolioSection = React.lazy(() => import("./Pages/PortfolioSection"));
const AboutSection = React.lazy(() => import("./components/AboutSection"));
const HeroPage = React.lazy(() => import("./Pages/HeroPage"));
const ImagePicker = React.lazy(() => import("./components/ImagePicker"));
import PageLayout from "./Layouts/PageLayout";
import { Box, Spinner } from "@chakra-ui/react";
import Gallery from "./components/Gallery";

function App() {
	return (
		<PageLayout>
			<Suspense fallback={
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
					<Spinner size="xl" color="white"/>
				</Box>
			}>
			<PreloadImage />
				<Routes>
					<Route path="/" element={<HeroPage />} />
					<Route path="/photography/*" element={<PortfolioSection />} />
					<Route path="/about" element={<AboutSection />} />
					<Route path="/image-picker" element={<ImagePicker />} />
					<Route path="/gallery" element={<Gallery />} />
				</Routes>
			</Suspense>
		</PageLayout>
	);
}

export default App;
