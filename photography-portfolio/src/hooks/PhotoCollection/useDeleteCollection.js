import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useDeleteCollection = () => {
  const deleteCollection = async (collectionId) => {
    const collectionRef = doc(firestore, 'photoCollections', collectionId);
    await deleteDoc(collectionRef);
  };

  return { deleteCollection };
};

export default useDeleteCollection;