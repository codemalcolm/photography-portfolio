import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useEditPhoto = () => {
  const editPhoto = async (photoId, updatedData) => {
    try {
      const photoRef = doc(firestore, 'photos', photoId);
      await updateDoc(photoRef, updatedData);
    } catch (err) {
      console.error('Error editing photo:', err);
      throw err;
    }
  };

  return { editPhoto };
};

export default useEditPhoto;