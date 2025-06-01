import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useCollectionsStore } from "../../store/useCollectionsStore";

const useDeleteCollection = () => {
  const { removeCollection, setLoading, setError } = useCollectionsStore();

  const deleteCollection = async (collectionId) => {
    try {
      setLoading(true);

      const collectionRef = doc(firestore, "photoCollections", collectionId);
      await deleteDoc(collectionRef);
      removeCollection(collectionId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteCollection };
};

export default useDeleteCollection;
