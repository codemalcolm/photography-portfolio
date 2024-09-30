import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useDeleteCategory = () => {
  const deleteCategory = async (categoryId) => {
    const categoryRef = doc(firestore, 'categories', categoryId);
    await deleteDoc(categoryRef);
  };

  return { deleteCategory };
};

export default useDeleteCategory;