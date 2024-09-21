import { Flex, Spinner, Text } from '@chakra-ui/react'
import {Route, Link as RouterLink, Routes, useParams} from "react-router-dom"
import useFetchCollectionsByCategory from '../hooks/PhotoCollection/useFetchCollectionsByCategory';
import TestPage265 from './TestPage265';

const CollectionList = () => {
    const { categoryId } = useParams(); // Get categoryId from URL params
    const { collections, isLoading, error } = useFetchCollectionsByCategory(categoryId); 

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Text>Error loading collections: {error}</Text>;
    }

    return (
    <>
        <Flex justifyContent="center" gap={6} mt={"16px"} ml={"16px"} flexDirection={"column"}>
        {collections.map((collection) => (
          <RouterLink key={collection.id} to={`gallery/${collection.id}`}>
            <Flex
                justifyContent={"start"}
              _hover={{ opacity: 0.8, cursor: 'pointer' }} 
              minWidth="300px"
            >
              <Text 
                fontSize="4xl" 
                fontWeight="bold" 
                color="white" 
                p={2} 
              >
                {collection.name}
              </Text>
            </Flex>
          </RouterLink>
        ))}
      </Flex>

    </>
  )
}

export default CollectionList