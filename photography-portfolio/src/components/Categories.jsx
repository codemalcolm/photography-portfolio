import {
  Flex,
  Image,
  Text,
  Box,
  Center,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useFetchCategories from "../hooks/Category/useFetchCategories";
import { useEffect, useState } from "react";
import useCategoriesStore from "../store/useCategoriesStore";

const Categories = () => {
  const { fetchCategories } = useFetchCategories();

  const { categories, loading, error } = useCategoriesStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const [loadedImages, setLoadedImages] = useState(new Set());
  // State to store the natural dimensions (width, height) of loaded images
  const [imageDimensions, setImageDimensions] = useState({});
  const navigate = useNavigate();

  // Handle when an image finishes loading
  const handleImageLoad = (id, event) => {
    setLoadedImages((prev) => new Set([...prev, id]));
    // Get natural dimensions from the event target (the image element)
    const { naturalWidth, naturalHeight } = event.target;
    setImageDimensions((prev) => ({
      ...prev,
      [id]: { width: naturalWidth, height: naturalHeight },
    }));
  };

  const handleCategoryClick = async (category) => {
    if (category.hybrid) {
      // Redirect to the first collection's gallery for hybrid categories
      const firstCollectionId = category.collections[0];
      if (firstCollectionId) {
        navigate(`${category.id}/gallery/${firstCollectionId}`);
      }
    } else {
      // Redirect to the collections page for normal categories
      navigate(`${category.id}`);
    }
  };

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="md" color="white" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Text color="red.500">Error loading categories: {error.message}</Text>
      </Center>
    );
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      overflowY={{ "2xl": "auto", base: "auto" }}
      flexWrap="wrap"
      gap="16px"
      p="16px"
    >
      {categories?.map((category) => {
        const aspectRatio = imageDimensions[category.id]
          ? imageDimensions[category.id].height /
            imageDimensions[category.id].width
          : 3 / 4;

        return (
          <Box
            key={category?.id}
            onClick={() => handleCategoryClick(category)}
            cursor="pointer"
            position="relative"
            role="group"
            flexBasis={{
              base: "100%",
              sm: "calc(50% - 16px)",
              md: "calc(33.33% - 16px)",
              lg: "calc(25% - 16px)",
            }}
            flexGrow="1"
            flexShrink="1"
            minWidth={{ base: "280px", md: "300px" }}
            maxWidth={{ base: "100%", sm: "480px", md: "540px", lg: "660px" }}
          >
            <Box
              position="relative"
              _hover={{ filter: "brightness(0.7)" }}
              paddingTop={`${aspectRatio * 100}%`}
              width="100%"
              overflow="hidden"
              borderRadius="4px"
            >
              <Skeleton
                key={category?.id}
                isLoaded={loadedImages.has(category.id)}
                fadeDuration={0.2}
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                height="100%"
                width="100%"
                borderRadius="4px"
                startColor="#101118"
                endColor="#101118"
              >
                <Image
                  src={category?.imageUrl}
                  alt={"image with the name:" + category?.displayName}
                  objectFit="cover"
                  loading="lazy"
                  borderRadius="4px"
                  onLoad={(e) => handleImageLoad(category?.id, e)}
                  width="100%"
                  height="100%"
                />
              </Skeleton>
            </Box>

            {loadedImages?.has(category?.id) && (
              <Text
                bg="transparent"
                fontSize={{ base: "24px", md: "36px" }}
                fontWeight={500}
                color="white"
                position="absolute"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
                transition="font-size 0.3s ease, color 0.3s ease"
                _groupHover={{
                  fontSize: { base: "28px", md: "40px" },
                  color: "white",
                }}
                textAlign="center"
                w="80%"
                whiteSpace="nowrap"
                zIndex="1"
              >
                {category?.displayName}
              </Text>
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default Categories;
