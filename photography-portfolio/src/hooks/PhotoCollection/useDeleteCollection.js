import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { useState } from 'react';

const useDeleteCollection = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteCollection = async (collectionId) => {
    try {
      setLoading(true)
      const collectionRef = doc(firestore, 'photoCollections', collectionId);
      await deleteDoc(collectionRef);
      setSuccess(true)
    } catch (error) {
      console.log(error)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  };

  return { deleteCollection, loading, success };
};

export default useDeleteCollection;