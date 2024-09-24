import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

// Custom Hook to Add a Category
export const useAddCategory = () => {
	const [loading, setLoading] = useState(false); // For loading state
	const [error, setError] = useState(null); // For error handling
	const [success, setSuccess] = useState(false); // For success message
  
	// Function to upload an image to Firebase Storage
	const uploadImage = async (imageFile) => {
	  if (!imageFile) return null;
  
	  const storage = getStorage();
	  const storageRef = ref(storage, `categories/${imageFile.name}`);
	  const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
	  return new Promise((resolve, reject) => {
		uploadTask.on(
		  "state_changed",
		  null,
		  (error) => reject(error),
		  async () => {
			const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
			resolve(downloadUrl);
		  }
		);
	  });
	};
  
	// Function to add a new category
	const addCategory = async (categoryData, imageFile) => {
	  setLoading(true); // Start loading
	  setError(null); // Reset error state
	  setSuccess(false); // Reset success state
  
	  try {
		// Validate the data
		if (!categoryData.displayName) {
		  throw new Error("Category must have a name.");
		}
  
		// Upload the image if provided
		let imageUrl = "";
		if (imageFile) {
		  imageUrl = await uploadImage(imageFile);
		}
  
		// Add new document to 'categories' collection (Firebase auto-generates the id)
		await addDoc(collection(firestore, "categories"), {
		  displayName: categoryData.displayName,
		  collections: categoryData.collections || [], // Collections can be added later
		  description: categoryData.description || "", // Optional description
		  dateCreated: serverTimestamp(), // Add timestamp
		  order: categoryData.order || 0, // Default order (0 if not provided)
		  imageUrl: imageUrl || "", // Store image URL if provided
		});
  
		setSuccess(true); // Set success if the operation was successful
	  } catch (err) {
		setError(err.message); // Capture any error message
	  } finally {
		setLoading(false); // Stop loading after operation is complete
	  }
	};
  
	return { addCategory, loading, error, success }; // Return function and state variables
  };
  
  export default useAddCategory;
