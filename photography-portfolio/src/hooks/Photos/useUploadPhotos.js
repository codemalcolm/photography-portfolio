// hooks/useUploadPhotos.js

import { useState } from 'react';
import { storage, firestore } from "../../firebase/firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, updateDoc, doc, arrayUnion, query, orderBy, getDocs } from 'firebase/firestore';

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

      // Get the current photo count in the collection to generate the order number
      const photoCollectionRef = collection(firestore, 'photos');
      const q = query(photoCollectionRef, orderBy('order', 'desc'));  // Order by 'order' in descending order
      const querySnapshot = await getDocs(q);
      const existingPhotosCount = querySnapshot.empty ? 0 : querySnapshot.docs[0].data().order;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const bigFile = bigFiles[i];

        const fileRef = ref(storage, `photos/small/${file.name}`);
        const bigFileRef = ref(storage, `photos/big/${bigFile.name}`);

        await uploadBytes(fileRef, file);
        await uploadBytes(bigFileRef, bigFile);

        const smallURL = await getDownloadURL(fileRef);
        const bigURL = await getDownloadURL(bigFileRef);

        // Assign the order based on the current count
        const order = existingPhotosCount + i + 1;  // This will start from the next number after the last existing order

        const photoDocRef = await addDoc(collection(firestore, 'photos'), {
          name: names[i] || file.name,
          url: { small: smallURL, big: bigURL },
          collectionId: collectionId,
          dateCreated: new Date(),
          order: order,  // Add the order field
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
