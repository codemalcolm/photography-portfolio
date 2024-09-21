// useFetchPhotosByCollectionId.js
import { useState, useEffect } from 'react';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useFetchPhotosByCollection = (collectionId) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Fetch the photo collection document to get photo IDs
        const collectionDoc = doc(firestore, 'photoCollections', collectionId);
        const docSnap = await getDocs(collectionDoc);

        if (!docSnap.exists()) {
          throw new Error('Collection not found');
        }

        const photoIds = docSnap.data().photos;
        const photoPromises = photoIds.map(id => getDocs(doc(firestore, 'photos', id)));

        const photoSnapshots = await Promise.all(photoPromises);
        const photoData = photoSnapshots.map(snapshot => snapshot.data());

        setPhotos(photoData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [collectionId]);

  return { photos, isLoading, error };
};

export default useFetchPhotosByCollection;