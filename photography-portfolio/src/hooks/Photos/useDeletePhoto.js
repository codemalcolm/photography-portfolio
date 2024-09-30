import { doc, deleteDoc, updateDoc, arrayRemove, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { ref } from 'firebase/storage';

const useDeletePhoto = (photoId, collectionId) => {
  const deletePhoto = async (photoId) => {
    try {
      // Remove the photo document from the photos collection
      await deleteDoc(doc(firestore, 'photos', photoId));

    } catch (err) {
      console.error('Error deleting photo:', err);
      throw err;
    }
  }
    const deletePhotoFromCollection = async (photoId, collectionId) => {
    try {
      // Remove the photo document from the photos collection
      await deleteDoc(doc(firestore, 'photos', photoId));
      console.log(collectionId)

      // Remove the photo ID from the collection's photos array
      const collectionRef = doc(firestore, 'photoCollections', collectionId);

      console.log(collectionRef)
      await updateDoc(collectionRef, {
        photos: arrayRemove(photoId), // Remove the photoId from the photos array
      });

    } catch (err) {
      console.error('Error deleting photo from collectio:', err);
      throw err;
    }
  };

  return { deletePhoto, deletePhotoFromCollection };
};

export default useDeletePhoto;