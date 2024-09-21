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

function App() {
	return (
		<PageLayout>
			<Suspense fallback={<div>Loading...</div>}>
			<PreloadImage />
				<Routes>
					<Route path="/" element={<HeroPage />} />
					<Route path="/photography/*" element={<PortfolioSection />} />
					<Route path="/about" element={<AboutSection />} />
					<Route path="/image-picker" element={<ImagePicker />} />
				</Routes>
			</Suspense>
		</PageLayout>
	);
}

export default App;
