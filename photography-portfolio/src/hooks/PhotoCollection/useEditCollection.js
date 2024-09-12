
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useEditCollection = () => {
  const editCollection = async (collectionId, updatedData) => {
    const collectionRef = doc(firestore, 'photoCollections', collectionId);
    await updateDoc(collectionRef, updatedData);
  };

  return { editCollection };
};

export default useEditCollection;
