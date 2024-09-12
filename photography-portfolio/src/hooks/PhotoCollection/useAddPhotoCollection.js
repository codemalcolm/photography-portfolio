// hooks/PhotoCollection/useAddPhotoCollection.js
import { useState } from 'react';
import { doc, updateDoc, arrayUnion, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase'; // Adjust the path as needed

// Custom Hook to Add a Photo Collection to a Category
export const useAddPhotoCollection = () => {
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null);       // For error handling
  const [success, setSuccess] = useState(false);  // For success message

  // Function to add a new photo collection
  const addPhotoCollection = async (categoryId, collectionData) => {
    setLoading(true);  // Start loading
    setError(null);    // Reset error state
    setSuccess(false); // Reset success state

    try {
      if (!categoryId || !collectionData.name) {
        throw new Error('Category ID and collection name are required.');
      }

      // Create a new document in the 'photoCollections' collection
      const newCollectionRef = doc(collection(firestore, 'photoCollections'));
      await setDoc(newCollectionRef, {
        name: collectionData.name,
        description: collectionData.description || '',
        photos: collectionData.photos || [],
        dateCreated: serverTimestamp(),
      });

      // Update the category document to include the new collection ID
      const categoryRef = doc(firestore, 'categories', categoryId);
      await updateDoc(categoryRef, {
        collections: arrayUnion(newCollectionRef.id), // Add the new collection's ID to the collections array
      });

      setSuccess(true); // Set success if the operation was successful
    } catch (err) {
      setError(err.message); // Capture any error message
    } finally {
      setLoading(false); // Stop loading after operation is complete
    }
  };

  return { addPhotoCollection, loading, error, success }; // Return function and state variables
};

export default useAddPhotoCollection;
