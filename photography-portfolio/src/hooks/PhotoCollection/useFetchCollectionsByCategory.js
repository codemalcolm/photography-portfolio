import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useFetchCollectionsByCategory = (initialCategoryId) => {
  const [collections, setCollections] = useState([]);  // To store collections fetched via useEffect
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch collections for a specific categoryId
  const fetchCollectionsByCategory = async (categoryId) => {
    try {
      // Fetch the category document by categoryId
      const categoryRef = doc(firestore, 'categories', categoryId);

      const categorySnap = await getDoc(categoryRef);
      console.log(categorySnap+ "Snap")

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

      return collectionsData;  // Return collections data from the manual fetch
    } catch (error) {
      console.error("Error fetching collections:", error);
      return;
    }
  };

  // Automatically fetch collections when the component mounts and the initialCategoryId is set
  useEffect(() => {
    const fetchCollectionsForInitialCategory = async () => {
      if (!initialCategoryId) return;  // Do nothing if no categoryId is provided

      try {
        const collectionsData = await fetchCollectionsByCategory(initialCategoryId);
        setCollections(collectionsData);  // Set collections for the initial category
      } catch (error) {
        setError(error.message);  // Handle any errors during fetching
      } finally {
        setIsLoading(false);  // Set loading to false after fetching
      }
    };

    fetchCollectionsForInitialCategory();
  }, [initialCategoryId]);  // Only runs if initialCategoryId changes

  return {
    collections,        // Collections fetched via useEffect
    isLoading,          // Loading state for useEffect
    error,              // Error state for useEffect
    fetchCollectionsByCategory,  // Manual function to fetch collections on demand
  };
};

export default useFetchCollectionsByCategory;