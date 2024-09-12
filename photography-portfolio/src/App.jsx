import React, { Suspense } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	BrowserRouter,
} from "react-router-dom";
import ImagePicker from "./components/ImagePicker";
import PreloadImage from "./components/PreloadImage";

// Lazy loading imports
const PortfolioSection = React.lazy(() => import("./Pages/PortfolioSection"));
const AboutSection = React.lazy(() => import("./components/AboutSection"));
const HeroPage = React.lazy(() => import("./Pages/HeroPage"));

import PageLayout from "./Layouts/PageLayout";
// import { SmoothScrollProvider } from "./contexts/SmoothScrollContext";



function App() {
	return (
		<PageLayout>
			<Suspense fallback={<div>Loading...</div>}>
				<PreloadImage/>
				<Routes>
					<Route path="/" element={<HeroPage />} />
					<Route path="about" element={<AboutSection />} />
					<Route path="photography/*" element={<PortfolioSection />} />
					<Route path="/lol" element={<ImagePicker />} />
				</Routes>
			</Suspense>
		</PageLayout>
	);
}

export default App;
