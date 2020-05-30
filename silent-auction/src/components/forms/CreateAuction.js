import React, { useState, useEffect } from 'react';
import '../../css/index.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import UploadImage from '../UploadImage';
import { useHistory } from "react-router-dom";

const formSchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is a required field"),
    description: yup
        .string()
        .required("Description is a required field"),
    initialPrice: yup
        .number()
        .moreThan(0, "Must be greater than zero")
        .required("Starting price is a required field")

});

const CreateAuctionCard = props => {

    const history = useHistory();

    const images = [];

    const [image, setImage] = useState('')

    const [formState, setFormState] = useState({
       
        imgUrl: "",
        sellerId: 0, // the id of the seller
        bidderId: "",
        title: "",
        description: "",
        bid: 0,
        initialPrice: 0,
        timeSubmitted: "",
        timeEnd: new Date(),
        timeDuration: "",
        timeDurationInMs: "",
        completed: false
        //reserve: 100,// min price the seller will take for the item
        //bidHistory: [] // array of objects holding all the bidder id's and what they bid for this item

    });

    const [errorState, setErrorState] = useState({
        title: "",
        description: "",
        initialPrice: 0,

    });

    const validate = e => {
        let value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
            .reach(formSchema, e.target.name)
            .validate(value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const [buttonDisabled, setSubmitButton] = useState(true);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setSubmitButton(!valid); // enable submit button if form is valid
        });
        //formState.imgUrl = image;
    }, [formState]);

    const handleSubmit = (event) => {

        event.preventDefault();
        formState.imgUrl = image;
        formState.timeSubmitted = Math.floor(Date.now() / 1000);
        axios
            .post("https://silent-auction-2.herokuapp.com/auth/users/auction/create", formState) // need end point
            .then(response => console.log(response))
            .catch(err => console.log(err));
        console.log(formState);
        history.push("/confirm", {auction: formState.title, type: 1} );

    };


    const inputChange = (e) => {
        e.persist();
        validate(e);
        let value = e.target.value;
        if (e.target.type === "file") {
            console.log(value);
             
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
                        {/*<div className="imageContainer">
                            {// map over the images 
                                formState.images.map((image, i) => {

                                    return <div className="auctionImage" key={i}><img src={image} /></div>

                                })}


                            </div>*/}

                        <div className="imageContainer">
                        <UploadImage image={image} setImage={setImage}/>
                        </div>
                        

                        {/*<label className="addImage" htmlFor="images">Add images:</label>
                        <input onChange={inputChange} type="file" id="image" name="image" accept="image/png, image/jpeg" />*/}


                        <label htmlFor="title"></label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Title"
                            value={formState.title}
                            onChange={inputChange}
                        />
                        {errorState.title.length > 0 ? (
                            <p className="error">{errorState.title}</p>
                        ) : null}

                        <label htmlFor="description"></label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Description"
                            value={formState.description}
                            onChange={inputChange}
                        />
                        {errorState.description.length > 0 ? (
                            <p className="error">{errorState.description}</p>
                        ) : null}

                        <label htmlFor="initialPrice"></label>
                        <input
                            id="initialPrice"
                            name="initialPrice"
                            type="text"
                            placeholder="Starting Price"
                            value={formState.initialPrice}
                            onChange={inputChange}
                        />
                        {errorState.initialPrice.length > 0 ? (
                            <p className="error">{errorState.initialPrice}</p>
                        ) : null}

                        <label htmlFor="endDate">End date:</label>

                        <DatePicker
                            showPopperArrow={true}
                            selected={new Date(formState.timeEnd)}
                            onChange={date => setFormState({ ...formState, timeEnd: date.toLocaleDateString() })}       //formState.timeEnd = date}
                        />
                    </form>
                </div>
                {!buttonDisabled ? <div className="buttonContainer" onClick={handleSubmit}><div className="createButton">Start Auction</div></div> : ""}
            </div>
        </div>
    );
}

export default CreateAuctionCard;