import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const useFetchCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the fetch function with useCallback to ensure referential stability
  const fetchCollections = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const querySnapshot = await getDocs(collection(firestore, "photoCollections"));
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
  }, []);

  // Fetch collections on component mount
  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  // Return collections, loading state, error, and the refetch function
  return { collections, loading, error, refetch: fetchCollections };
};

export default useFetchCollections;
