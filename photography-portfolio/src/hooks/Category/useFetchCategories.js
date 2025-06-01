// hooks/Category/useFetchCategories.js
import { useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase"; // Adjust the path as needed
import useCategoriesStore from "../../store/useCategoriesStore";

// Custom Hook to Fetch Categories
export const useFetchCategories = () => {
  const { setCategories, setLoading, setError } = useCategoriesStore();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const querySnapshot = await getDocs(collection(firestore, "categories"));
      const categoriesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setCategories, setLoading, setError]);

  return { fetchCategories };
};

export default useFetchCategories;
