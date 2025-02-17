// hooks/useUploadPhotos.js

import { useState } from 'react';
import { storage, firestore } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';

const useUploadPhotos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadPhotos = async (files, bigFiles, names, collectionId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const photoIds = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const bigFile = bigFiles[i];

        const fileRef = ref(storage, `photos/small/${file.name}`);
        const bigFileRef = ref(storage, `photos/big/${bigFile.name}`);

        await uploadBytes(fileRef, file);
        await uploadBytes(bigFileRef, bigFile);

        const smallURL = await getDownloadURL(fileRef);
        const bigURL = await getDownloadURL(bigFileRef);

        // Assign the order based on the file's index (1-based)
        const order = i + 1;

        const photoDocRef = await addDoc(collection(firestore, 'photos'), {
          name: names[i] || file.name,
          url: { small: smallURL, big: bigURL },
          collectionId: collectionId,
          dateCreated: new Date(),
          order: order, // Add the order field
        });

        photoIds.push(photoDocRef.id);
      }

      const collectionRef = doc(firestore, 'photoCollections', collectionId);
      await updateDoc(collectionRef, {
        photos: arrayUnion(...photoIds),
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
