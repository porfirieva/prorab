import {Box, Button} from "@mui/material";
import {useEffect, useState} from "react";

const FileInput = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
        props.getImg(selectedImage)
    }, [selectedImage]);

    console.log(selectedImage)


    return (
        <div>
            {imageUrl && selectedImage && (
                <Box >
                    <img src={imageUrl} alt={selectedImage.name}
                         height="100px"
                         style={{borderRadius: '100%'}}
                    />
                </Box>
            )}
            <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: 'none' }}
                onChange={e => setSelectedImage(e.target.files[0])}
            />
            <label htmlFor="select-image" className="select__image">
                <Button variant="contained"
                        color="primary"
                        component="span"
                        style={{background: 'transparent', boxShadow: 'none', position: "absolute", left: 0, right: 0, bottom: 0, top: 0}}
                >
                </Button>
            </label>
        </div>
    );
};

export default FileInput;