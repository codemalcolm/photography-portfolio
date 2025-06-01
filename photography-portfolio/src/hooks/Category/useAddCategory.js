import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import useCategoriesStore from "../../store/useCategoriesStore";

// Custom Hook to Add a Category
export const useAddCategory = () => {
  const { createCategory, setLoading, setError } = useCategoriesStore();

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

      const categoryPayload = {
        displayName: categoryData.displayName,
        collections: categoryData.collections || [], // Collections can be added later
        description: categoryData.description || "", // Optional description
        dateCreated: serverTimestamp(), // Add timestamp
        order: categoryData.order || 0, // Default order (0 if not provided)
        imageUrl: imageUrl || "", // Store image URL if provided
      };

      // Add new document to 'categories' collection (Firebase auto-generates the id)
      const newCategoryRef = await addDoc(collection(firestore, "categories"), categoryPayload);

      const response = await getDoc(newCategoryRef);
      const newCategory = { id: response.id, ...response.data() };
      console.log(response);
      console.log(newCategory);

      createCategory(newCategory);
    } catch (err) {
      setError(err.message); // Capture any error message
    } finally {
      setLoading(false); // Stop loading after operation is complete
    }
  };

  return { addCategory }; // Return function and state variables
};

export default useAddCategory;
