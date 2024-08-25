import React, { useState } from 'react'
import "./updatePage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdatePage = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [uploadError, setUploadError] = useState(""); 
    const post = useLoaderData();
    const [images, setImages] = useState(post.images);
    const navigate = useNavigate();
   
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);
    
        setDescriptionError("");
        setError("");
        setUploadError("");
    
        if (!value.trim()) {
          setDescriptionError("Description is required.");
          console.log(descriptionError)
          return;
        }
    
        if (images.length === 0) {
          setUploadError("At least one image is required.");
          return;
        }
    
        try {
          const res = await apiRequest.put(`/posts/${post.id}`, {
            postData: {
              title: inputs.title,
              price: parseInt(inputs.price),
              address: inputs.address,
              city: inputs.city,
              bedroom: parseInt(inputs.bedroom),
              bathroom: parseInt(inputs.bathroom),
              type: inputs.type,
              property: inputs.property,
              latitude: inputs.latitude,
              longitude: inputs.longitude,
              images: images,
            },
            postDetail: {
              desc: value,
              utilities: inputs.utilities,
              pet: inputs.pet,
              income: inputs.income,
              size: parseInt(inputs.size),
              school: parseInt(inputs.school),
              bus: parseInt(inputs.bus),
              restaurant: parseInt(inputs.restaurant),
            }
          });
          navigate("/"+res.data.id)
        } catch (err) {
          console.log(err);
          setError(error);
        }
      };
  return (
    <div className="updatePage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleUpdate} >
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" defaultValue={post.title} required/>
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" defaultValue={post.price}  required/>
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" defaultValue={post.address}  required/>
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} defaultValue={post.postDetail.desc} />
              {descriptionError && <span className="error">{descriptionError}</span>}
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" defaultValue={post.city} required/>
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" defaultValue={post.bedroom}  required/>
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" defaultValue={post.bathroom}  required/>
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" defaultValue={post.latitude}  required/>
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" defaultValue={post.longitude}  required/>
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" defaultValue={post.type} required>
                <option value="location" >
                  location
                </option>
                <option value="achat">achat</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property" defaultValue={post.property} required>
                <option value="appartement">appartement</option>
                <option value="maison">maison</option>
                <option value="condo">condo</option>
                <option value="terrain">terrain</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities" defaultValue={post.postDetail.utilities} required>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" defaultValue={post.postDetail.pet} required>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
                defaultValue={post.postDetail.income} 
                required
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" defaultValue={post.postDetail.size}  required/>
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" defaultValue={post.postDetail.school}  required/>
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" defaultValue={post.postDetail.bus}  required/>
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" defaultValue={post.postDetail.restaurant}  required/>
            </div>
            <button className="sendButton">Update</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dlpa1nu3i",
            uploadPreset: "Immo-App",
            folder: "posts",
          }}
          setState={setImages}
          isRequired={true}
        />
      </div>
    </div>
  )
}

export default UpdatePage