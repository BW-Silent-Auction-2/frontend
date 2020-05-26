import React, { useState, useEffect } from 'react';
import '../../css/index.css';
import { Link } from 'react-router-dom';
import axios from "axios";

const CreateAuctionCard = props => {

    const [formState, setFormState] = useState({

        id: 0,
        images: [],
        sellerId: 0, // the id of the seller
        title: "",
        description: "",
        startingPrice: 0,
        currentBid: 0,
        duration: "1 Day",
        //reserve: 100,// min price the seller will take for the item
        //bidHistory: [] // array of objects holding all the bidder id's and what they bid for this item

    });

    const images = [];

    useEffect(() => {
        /*axios
        .get()
        .then(response => {
                  
        })
        .catch(err => {
          console.log(err);
        }
        ); */

    }, [formState]); 

    const handleSubmit = (event) => {
        
        event.preventDefault();
        console.log(formState);

    };


    const inputChange = (e) => {
        e.persist();
        // validate the form 
        let value = e.target.value;
        if (e.target.type === "file") {
            value = e.target.files[0];
            const objectURL = URL.createObjectURL(value) // grab the full local URL
            formState.images.push(objectURL);
            setFormState({ ...formState, [images]: objectURL });

        } else {
            value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
            setFormState({ ...formState, [e.target.name]: value });
        }

    }

    return (

        <div className="mainContainer">
            <div className="createAuctionCard" >

                <h1>Create A New Auction</h1>
                <div className="formContainer">
                    <form>
                        <div className="imageContainer">
                            {// map over the images 
                                formState.images.map((image, i) => {
                                    
                                    return <div className="auctionImage" key={i}><img  src={image} /></div>

                                })}


                        </div>
                        <label className="addImage" htmlFor="images">Add images:</label>
                        <input onChange={inputChange} type="file" id="image" name="image" accept="image/png, image/jpeg" />


                        <label htmlFor="title"></label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Title"
                            //value={formData.name}
                            onChange={inputChange}
                        />

                        <label htmlFor="description"></label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Description"
                            //value={formData.name}
                            onChange={inputChange}
                        />

                        <label htmlFor="startingPrice"></label>
                        <input
                            id="startingPrice"
                            name="startingPrice"
                            type="text"
                            placeholder="Starting Price"
                            //value={formData.name}
                            onChange={inputChange}
                        />

                        <label htmlFor="duration">Duration:</label>
                        <select
                            name="duration"
                            id="duration"
                            //value={formState.size}
                            onChange={inputChange}
                        >
                            <option value="onDay">1 Day</option>
                            <option value="twoDay">2 Days </option>
                            <option value="threeDay">3 Days </option>
                            <option value="fourDay">4 Days </option>
                            <option value="fiveDay">5 Days </option>

                        </select>


                    </form>


                </div>

                <div className="buttonContainer" onClick={handleSubmit}><div className="createButton">Start Auction</div></div>

            </div>
        </div>


    );
}

export default CreateAuctionCard;