// hooks/useUploadPhotos.js
import { useState } from 'react';
import { storage, firestore } from "../../firebase/firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';

const useUploadPhotos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadPhotos = async (files, names, collectionId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const photoIds = [];

      // Upload each file and save its metadata in Firestore
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileRef = ref(storage, `photos/${file.name}`);
        await uploadBytes(fileRef, file);

        const downloadURL = await getDownloadURL(fileRef);

        // Save photo metadata to 'photos' collection in Firestore
        const photoDocRef = await addDoc(collection(firestore, 'photos'), {
          name: names[i] || file.name, // Use provided name or file name
          url: downloadURL, // Store the download URL
          collectionId: collectionId, // Store the collection it belongs to
          dateCreated: new Date(),
        });

        // Save the new photo's ID
        photoIds.push(photoDocRef.id);
      }

      // Update the photoCollections document to include the new photo IDs
      const collectionRef = doc(firestore, 'photoCollections', collectionId);
      await updateDoc(collectionRef, {
        photos: arrayUnion(...photoIds), // Add the new photo IDs to the array
      });

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadPhotos, loading, error, success };
};

export default useUploadPhotos;