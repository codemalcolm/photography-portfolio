import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useCollectionsStore } from "../../store/useCollectionsStore";

const useEditCollection = () => {
  const { updateCollection, setLoading, setError } =
    useCollectionsStore();
  const editCollection = async (collectionId, updatedData) => {
    setLoading(true);

    try {
      const collectionRef = doc(firestore, "photoCollections", collectionId);
      await updateDoc(collectionRef, updatedData);

      updateCollection(collectionId, updatedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return { editCollection };
};

export default useEditCollection;
