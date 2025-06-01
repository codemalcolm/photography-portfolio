// hooks/PhotoCollection/useAddPhotoCollection.js
import { useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  collection,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase"; // Adjust the path as needed
import { useCollectionsStore } from "../../store/useCollectionsStore";

// Custom Hook to Add a Photo Collection to a Category
export const useAddPhotoCollection = () => {
  const { addCollection, setLoading, setError, setSuccess } =
    useCollectionsStore();

  // Function to add a new photo collection
  const addPhotoCollection = async (categoryId, collectionData) => {
    setLoading(true);

    try {
      if (!categoryId || !collectionData.name) {
        throw new Error("Category ID and collection name are required.");
      }

      // Create a new document in the 'photoCollections' collection
      const newCollectionRef = doc(collection(firestore, "photoCollections"));

      const collectionPayload = {
        name: collectionData.name,
        description: collectionData.description || "",
        photos: collectionData.photos || [],
        dateCreated: serverTimestamp(),
      };

      await setDoc(newCollectionRef, collectionPayload);

      const response = await getDoc(newCollectionRef);
      const newCollection = { id: response.id, ...response.data() };

      // add collection documetn to global state
      addCollection(newCollection);

      // Update the category document to include the new collection ID
      const categoryRef = doc(firestore, "categories", categoryId);
      await updateDoc(categoryRef, {
        collections: arrayUnion(newCollectionRef.id), // Add the new collection's ID to the collections array
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message); // Capture any error message
    } finally {
      setLoading(false); // Stop loading after operation is complete
    }
  };

  return { addPhotoCollection }; // Return function and state variables
};

export default useAddPhotoCollection;
