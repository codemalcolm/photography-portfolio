// hooks/useFetchPhotosByIds.js
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase'

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
        const photosRef = collection(firestore, 'photos');
        const q = query(photosRef, where('__name__', 'in', photoIds)); // Query photos by IDs
        const snapshot = await getDocs(q);
        const photosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPhotos(photosData);
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
