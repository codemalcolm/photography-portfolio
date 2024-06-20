import {useState} from 'react'


const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null)


    const handleImageChange = (e) =>{
        const file = e.target.files[0]
        if(file && file.type.startsWith("image/")){
            
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFile(reader.result)
            }

            reader.readAsDataURL(file)
        }else {
            console.log("Error", "Please select an image file", "error")
            setSelectedFile(null)
        }
    }
    return {selectedFile, handleImageChange, setSelectedFile}
}

export default usePreviewImg