import { useEffect, useState } from "react";
import { collection,getDocs} from "firebase/firestore"
import { firestore } from "../../firebase/firebase";

const useFetchCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCollections = async () => {
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(firestore, 'photoCollections'));
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
      };
  
      fetchCollections();
    }, []);
  
    return { collections, loading, error };
  };
  
  export default useFetchCollections;