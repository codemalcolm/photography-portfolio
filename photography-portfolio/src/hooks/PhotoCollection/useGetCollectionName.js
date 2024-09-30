import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";

const useGetCollectionName = (collectionId) => {
    const [collectionName, setCollectionName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!collectionId) {
        setError("Collection ID is required");
        setLoading(false);
        return;
      }
  
      const fetchCollectionName = async () => {
        setLoading(true);
        try {
          // Get the specific document by collectionId
          const docRef = doc(firestore, 'photoCollections', collectionId);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            // Assuming 'name' is a field in your document
            setCollectionName(docSnap.data().name || "Unnamed Collection");
          } else {
            setError("No such collection found");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCollectionName();
    }, [collectionId]);
  
    return { collectionName, loading, error };
  };
  
  export default useGetCollectionName;