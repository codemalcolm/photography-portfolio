import {
	Route,
	Routes,
	useParams,
} from "react-router-dom";
import React from "react";
import Gallery from "../components/Gallery";
import { CollectionCacheProvider } from "../Providers/CollectionCacheContext";

const BackArrow = React.lazy(() => import("../components/BackArrow"));
const CollectionList = React.lazy(() => import("../components/CollectionList"));

const Collections = () => {
	const { categoryId } = useParams();

	return (
		<>
			<BackArrow />
			<CollectionCacheProvider>
				<Routes>
					<Route path="/" element={<CollectionList />} />
					<Route
						path="gallery/:collectionId/*"
						element={<Gallery categoryId={categoryId} />}
					/>
				</Routes>
			</CollectionCacheProvider>
		</>
	);
};

export default Collections;
