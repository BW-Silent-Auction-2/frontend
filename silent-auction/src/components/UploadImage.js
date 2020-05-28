import '../css/index.css';
import React, { useState, useEffect } from 'react';

function UploadImage(props) {
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const uploadImage = async e => {
        e.persist()
        //console.log(e)
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'xegspegc')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dputswhco/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        setLoading(false)
        console.log(data.values())
    }

    useEffect (()=>{
        props.setImage(image)
    }, [image])

    return (
        <div className="upload" >
            <h1>Upload Image</h1>
            <input type='file'
                type='file'
                placeholder='Upload an image'
                onChange={uploadImage}
            />
            {loading ? (
                <h3 className="imageContainer">Loading</h3>
            ) : (
                    <img src={image} style={{ width: '300px' }} />
                )}
            <h1>{image}</h1>
            

        </div>
    );
}

export default UploadImage;