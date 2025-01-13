import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const useFetchPhotoIdsByCollection = (collectionId) => {
  const [photoIds, setPhotoIds] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount

    const fetchCollection = async () => {
      if (!collectionId) return;

      setIsLoading(true);
      setError(null);

      try {
        const collectionDocRef = doc(firestore, "photoCollections", collectionId);
        const collectionSnap = await getDoc(collectionDocRef);

        if (collectionSnap.exists() && isMounted) {
          const collectionData = collectionSnap.data();
          setPhotoIds(collectionData.photos || []); // Set photoIds or an empty array
        } else if (isMounted) {
          setError("Collection not found");
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCollection();

    return () => {
      isMounted = false; // Cleanup function to prevent updates after unmount
    };
  }, [collectionId]);

  return { photoIds, isLoading, error };
};

export default useFetchPhotoIdsByCollection;
