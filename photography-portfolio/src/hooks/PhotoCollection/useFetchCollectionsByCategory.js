import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useFetchCollectionsByCategory = (categoryId) => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionsAndPhotos = async () => {
      try {
        // Fetch the category document by categoryId
        const categoryRef = doc(firestore, 'categories', categoryId);
        const categorySnap = await getDoc(categoryRef);

        if (!categorySnap.exists()) {
          throw new Error('Category not found');
        }

        // Get the collection IDs from the category's 'collections' field 
        const { collections: collectionIds } = categorySnap.data();

        if (!collectionIds || collectionIds.length === 0) {
          throw new Error('No collections found for this category');
        }

        // Fetch the collections from 'photoCollections' using the collection IDs
        const collectionsRef = collection(firestore, 'photoCollections');
        const collectionsQuery = query(collectionsRef, where('__name__', 'in', collectionIds));
        const collectionsSnap = await getDocs(collectionsQuery); 

        // Map collections data
        const collectionsData = collectionsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCollections(collectionsData);
        console.log(collections)

      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollectionsAndPhotos();
  }, [categoryId]);

  return { collections, isLoading, error };
};

export default useFetchCollectionsByCategory;