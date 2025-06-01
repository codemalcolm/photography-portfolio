import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useCollectionStore } from "../../store/useCollectionStore";

const useFetchCollections = () => {
  const { setCollections, setLoading, setError } = useCollectionStore();

  // Define the fetch function with useCallback to ensure referential stability
  const fetchCollections = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "photoCollections")
      );
      const collectionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCollections(collectionsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setCollections, setLoading, setError]);

  // Return fetchCollections callback
  return { fetchCollections };
};

export default useFetchCollections;
