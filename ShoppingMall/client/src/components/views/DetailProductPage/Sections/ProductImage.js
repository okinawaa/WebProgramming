import React, {useEffect, useState} from 'react';
import ImageGallery from "react-image-gallery";


function ProductImage(props) {

    const [Images, setImages] = useState([]);

    useEffect(() => {

        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];


            props.detail.images && props.detail.images.map((item, index) => {
                images.push({
                    original: `http://localhost:5000/${item}`,      //실제로는 이부분 dynamic 하게처리
                    thumbnail: `http://localhost:5000/${item}`,
                })
            })
            setImages(images)
        }

    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images}/>
        </div>
    );
}

export default ProductImage;