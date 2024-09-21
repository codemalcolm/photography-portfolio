import { useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore'; // Import necessary Firestore methods

const useFetchPhotoIdsByCollection = (collectionId) => {
  const [photoIds, setPhotoIds] = useState(null); // For storing the array of photo IDs
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Reference to the specific document in the 'photoCollections' collection
        const collectionDocRef = doc(firestore, "photoCollections", collectionId);

        // Fetch the document snapshot
        const collectionSnap = await getDoc(collectionDocRef);

        if (collectionSnap.exists()) {
          const collectionData = collectionSnap.data();

          // Extract the photos array (array of photo IDs)
          setPhotoIds(collectionData.photos);
        } else {
          setError("Collection not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (collectionId) {
      fetchCollection();
    }
  }, [collectionId]);

  return { photoIds, isLoading, error };
};

export default useFetchPhotoIdsByCollection;
