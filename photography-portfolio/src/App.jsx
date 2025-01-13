import React, { Suspense } from "react";
import {
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

// Lazy loading imports
const PhotographyPage = React.lazy(() => import("./Pages/PhotographyPage.jsx"));
const AboutPage = React.lazy(() => import("./Pages/AboutPage.jsx"));
const HomePage = React.lazy(() => import("./Pages/HomePage.jsx"));
const ImagePicker = React.lazy(() => import("./components/ImagePicker"));
const ContactPage = React.lazy(() => import("./Pages/ContactPage.jsx"));
const AuthPage = React.lazy(() => import("./Pages/AuthPage.jsx"));
import PageLayout from "./Layouts/PageLayout";
import { Box, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase.js";

function App() {
	const [authUser] = useAuthState(auth);
	return (
		<PageLayout>
			<Suspense
				fallback={
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
						<Spinner size="md" color="white" />
					</Box>
				}
			>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/photography/*" element={<PhotographyPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route
						path="/image-picker"
						element={authUser ? <ImagePicker /> : <Navigate to="/auth" />}
					/>
					<Route
						path="/auth"
						element={!authUser ? <AuthPage /> : <Navigate to="/image-picker" />}
					/>
				</Routes>
			</Suspense>
		</PageLayout>
	);
}

export default App;
