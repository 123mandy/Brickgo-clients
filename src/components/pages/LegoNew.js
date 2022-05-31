import React, {useEffect, useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDropzone} from 'react-dropzone';
import { api } from '../helpers/helpers';

function LegoNew(){
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth);

    const [selectedImages, setSelectedImages] = useState([]);
    const [newName, setName] = useState(null);
    const [newDescription, setDescription] = useState(null);
    const [newImage, setImage] = useState([]);
    const [newPrice, setPrice] = useState(null);
    const [newQTY, setQTY] = useState(null);

    let imgURL = [];
    const onDrop = useCallback((acceptedFiles) => {
        const arr = acceptedFiles.map((file) => file);
        const newImages = arr.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setSelectedImages(selectedImages.concat(newImages));

        const API = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUNDINARY_CLOUD_NAME}/upload`;
        
        acceptedFiles.forEach(async(file)=>{
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.REACT_APP_CLOUNDINARY_CLOUD_UPLOAD_PRESET)

            const response = await fetch(API, {
                method: "post",
                body: formData
            })

            const data = await response.json();
            
            imgURL.push(data.secure_url);
            console.log(imgURL)
        })
        setImage(imgURL);
      }, [])
  
    const {getRootProps, getInputProps, isDragActive} = useDropzone(
        {
            onDrop,
            accept: "image/*",
            // multiple: false
        }
    )

    const selected_images = selectedImages?.map((file) => (
        <div style={{
            display:"inline-flex",
            justifyContent: "space-between",
        }}>
          <div style={{
              width: "30%",
              margin:"0 10px"
          }}>
             <img
               src={file.preview}
               style={{
                 width: "150px",
                 height: "150px",
                 display: "block",
                 objectFit: "cover",
               }}
             />
             <button onClick={() => deleteImage(file)}>
               Delete
             </button>
          </div>
        </div>
    ));

    const deleteImage = (file) => {
        const newFiles = [...selectedImages]; // make a var for the new array
        newFiles.splice(newFiles.indexOf(file), 1); // remove the file from the array
        setSelectedImages(newFiles);
    };
    
    const createOrUpdate = async()=>{
        const res = await api.createProduct({
            name: newName,
            description: newDescription,
            image: newImage,
            price: newPrice,
            qty: newQTY,
            user: user._id
        });
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        createOrUpdate();
    }


    // Use useEffect to authorize the user
    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    },[user,navigate]);
    
    return(
        <div>
            <form className="form">
                <div className="form-group">
                    <label>
                        Lego Set:
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your lego set name..."
                    onChange={(e)=> {setName(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <div {...getRootProps()} className="dropArea">
                        <input {...getInputProps()}/>
                        {
                          isDragActive ?
                            <p style={{lineHeight: "100px"}}>Drop the files here ...</p> :
                            <p style={{lineHeight: "100px"}}>Drag 'n' drop some files here, or click to select files</p>
                        }
                   </div>
                   {selected_images}
                </div>
                <div className="form-group">
                    <label>
                        Description:
                    </label>
                    <textarea
                    rows="10"
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter your lego set description..."
                    onChange={(e)=> {setDescription(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Price:
                    </label>
                    <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Enter your lego set price..."
                    onChange={(e)=> {setPrice(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Quatity:
                    </label>
                    <input
                    type="number"
                    className="form-control"
                    id="qty"
                    name="qty"

                    placeholder="Enter your lego set price..."
                    onChange={(e)=> {setQTY(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <button onClick={onSubmit} className="btn btn-block">Publish your set</button>
                </div>
            </form>
        </div>
    )
}



export default LegoNew;