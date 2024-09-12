import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useDeletePhoto = (collectionId) => {
  const deletePhoto = async (photoId) => {
    try {
      // Remove the photo document from the photos collection
      await deleteDoc(doc(firestore, 'photos', photoId));

      // Remove the photo ID from the collection's photos array
      const collectionRef = doc(firestore, 'photoCollections', collectionId);
      await updateDoc(collectionRef, {
        photos: arrayRemove(photoId), // Remove the photoId from the photos array
      });
    } catch (err) {
      console.error('Error deleting photo:', err);
      throw err;
    }
  };

  return { deletePhoto };
};

export default useDeletePhoto;