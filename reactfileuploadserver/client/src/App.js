import './App.css';
import React, {useState} from 'react';
import Dropzone from "react-dropzone";
import Axios from "axios";

function App() {

    const [Images, setImages] = useState([]);


    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0])

        // save the Image we chose inside the Node Server

        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.url])
                    console.log(Images)
                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }

    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images];
        newImages.splice(currentIndex, 1);

        setImages(newImages);
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}

            >
                {({getRootProps, getInputProps}) => (
                    <div style={{
                        width: '300px',
                        height: '240px',
                        border: '1px solid lightgray',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                         {...getRootProps()}
                    >
                        <input {...getInputProps()}/>

                    </div>
                )}
            </Dropzone>
            <div>

                {
                    Images.map((item, index) => {
                        return <div key={index}>
                            {item}
                            <a
                                href={`http://localhost:5000/${item}`}
                                download
                            >
                                Click to download
                            </a>
                        </div>
                    })
                }

            </div>


        </div>
    );
}

export default App;
