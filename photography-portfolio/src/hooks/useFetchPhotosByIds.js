import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Helper function to split photoIds into chunks of 10
const chunkArray = (array, chunkSize) => {
  const results = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
};

const useFetchPhotosByIds = (photoIds) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!photoIds || photoIds.length === 0) {
      setLoading(false);
      return;
    }

    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        const photosRef = collection(firestore, 'photos');

        // Split photoIds into chunks of 10 (Firestore limit for 'in' query)
        const chunks = chunkArray(photoIds, 10);
        const allPhotos = [];

        // Perform queries for each chunk
        for (const chunk of chunks) {
          const q = query(photosRef, where('__name__', 'in', chunk));
          const snapshot = await getDocs(q);

          const photosData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          allPhotos.push(...photosData);
        }

        setPhotos(allPhotos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [photoIds]);

  return { photos, loading, error };
};

export default useFetchPhotosByIds;
