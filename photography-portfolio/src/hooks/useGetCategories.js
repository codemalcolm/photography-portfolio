import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';

const useGetCategories = (type) => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories,setCategories] = useState([])

    useEffect(()=>{
        const getPosts = async () => {
            setIsLoading(true)
            try {
                const q = query(
					collection(firestore, "categories"),
					where("type", "==", type)
                )
                const querySnapshot = await getDocs(q);

                const arr = []

                querySnapshot.forEach(doc => {
                    arr.push({...doc.data(), id:doc.id})
                })
                
                setCategories(arr)
                
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
				setIsLoading(false);
			}
        }
        getPosts()

    },[type]);

    return { isLoading, categories}
}


export default useGetCategories