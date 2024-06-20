import { Box, Button, Input } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg';
import { color } from 'framer-motion';
import useUploadImages from '../hooks/useUploadImages';

const ImagePicker = () => {
    const fileRef = useRef(null);
    const [inputs, setInputs] = useState({
		category: "",
		name: "",
	});
    const {uploadImages ,isUpdating } = useUploadImages()
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();


    const handleClick = async () => {
		try {
            
			await uploadImages(inputs, selectedFile);
			setSelectedFile(null);

		} catch (error) {
			console.log("Error", error.message, "error");
		}
	};

  return (
    <Box mt={64}>
        <Input
        value={inputs.category}
        onChange={(e) =>
            setInputs({ ...inputs, category: e.target.value })
        }
        
        placeholder='category'
        />
        <Input
        value={inputs.name}
        onChange={(e) =>
            setInputs({ ...inputs, name: e.target.value })
        }
        placeholder='name'
        />
        <Button w="full" onClick={() => fileRef.current.click()}>
            Upload Image
        </Button>
        <Input
        type="file"
        hidden
        ref={fileRef}
        onChange={handleImageChange}
        />
                        <Button w="full" color="red" 
                        onClick={handleClick}>
            Done
        </Button>                            
    </Box>
  )
}

export default ImagePicker