import {useEffect, useState} from 'react'
import {query,collection,where,getDocs} from "firebase/firestore"
import { firestore } from "../firebase/firebase";

const useGetPhotos = (category) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        const getPosts = async () => {
            if(!category) return;
            setIsLoading(true)
            try {
                const q = query(
					collection(firestore, "photos"),
					where("category", "==", category)
                )
                const querySnapshot = await getDocs(q);

                console.log(querySnapshot , "query")

                const photos = []

                querySnapshot.forEach(doc => {
                    photos.push({...doc.data(), id:doc.id})
                })
                
                setPosts(photos)
                
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
				setIsLoading(false);
			}
        }
        getPosts(category)

    },[category]);

    return { isLoading, posts}
}

export default useGetPhotos