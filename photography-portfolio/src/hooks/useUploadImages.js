// import React, { useState } from 'react'
// import { firestore, storage } from '../firebase/firebase';
// import { getDownloadURL, ref, uploadString } from 'firebase/storage';
// import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

// const useUploadImages = () => {
//     const [isUpdating, setIsUpdating] = useState(false);

//     const uploadImages = async (inputs, selectedFile) => {
//         const storageRef = ref(storage, "/photos");
//         const photosRef = doc(firestore, "photos");
//         setIsUpdating(true)
//         const newImage = {
// 			category: inputs.category,
// 			name: inputs.name,
// 		};

//         try {
// 			const postDocRef = await addDoc(collection(firestore, "photos"), newImage);
// 			const imageRef = ref(storage, `photos/${postDocRef.id}`);

// 			await uploadString(imageRef, selectedFile, "data_url");
// 			const downloadURL = await getDownloadURL(imageRef);

// 			await updateDoc(postDocRef, { imageURL: downloadURL });

// 			newImage.imageURL = downloadURL;
//             console.log("Successful upload")
// 		} catch (error) {
// 			console.log("Error", error.message);
// 		} finally {
// 			setIsUpdating(false);
// 		}

//     }
//     return { isUpdating, uploadImages };
// }

// export default useUploadImages

import { useState } from 'react';
import { firestore, storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

const useUploadImages = () => {
    const [isUpdating, setIsUpdating] = useState(false);

    const uploadImages = async (inputs, selectedFile) => {
        setIsUpdating(true);

        try {
            // Step 1: Upload image to Firebase Storage
            const storageRef = ref(storage, `photos/${inputs.name}_${Date.now()}`);
            await uploadString(storageRef, selectedFile, 'data_url');
            const downloadURL = await getDownloadURL(storageRef);

            // Step 2: Add metadata to Firestore
            const newImage = {
                category: inputs.category,
                name: inputs.name,
                imageUrl: downloadURL, // Add imageURL directly here
            };

            const postDocRef = await addDoc(collection(firestore, 'photos'), newImage);
            console.log('Document written with ID: ', postDocRef.id);

        } catch (error) {
            console.error('Error uploading image or adding document: ', error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    return { isUpdating, uploadImages };
};

export default useUploadImages;
