import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Helper function to split photoIds into chunks of 10
const chunkArray = (array, chunkSize) => {
  const results = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
};

const useFetchPhotosByCollection = (collectionId) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetching logic
  const fetchPhotos = async () => {
    try {
      // Fetch the photo collection document to get photo IDs
      const collectionDoc = doc(firestore, "photoCollections", collectionId);
      const docSnap = await getDoc(collectionDoc);

      if (!docSnap.exists()) {
        throw new Error("Collection not found");
      }

      const photoIds = docSnap.data().photos;

      const chunks = chunkArray(photoIds, 10);
      const allPhotos = [];

      const photosRef = collection(firestore, "photos");

      // Perform queries for each chunk
      for (const chunk of chunks) {
        const q = query(photosRef, where("__name__", "in", chunk));
        const snapshot = await getDocs(q);

        const photosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        allPhotos.push(...photosData);
      }

      setPhotos(allPhotos);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // fetching newPhotos on each collectionId change
  useEffect(() => {
    fetchPhotos();
  }, [collectionId]);

  return { photos, isLoading, error };
};

export default useFetchPhotosByCollection;
