import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useCategoriesStore from "../../store/useCategoriesStore";

const useDeleteCategory = () => {
  const { removeCategory, setLoading, setError } = useCategoriesStore();

  const deleteCategory = async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const categoryRef = doc(firestore, "categories", categoryId);
      await deleteDoc(categoryRef);
      removeCategory(categoryId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { deleteCategory };
};

export default useDeleteCategory;
