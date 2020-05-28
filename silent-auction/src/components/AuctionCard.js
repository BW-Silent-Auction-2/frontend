import React, { useState, useEffect } from 'react';
import '../css/index.css';
import { Link } from 'react-router-dom';
import axios from "axios";

const AuctionCard = props => {
  const [bid, setBid] = useState({
    auctionId: 0,
    bidderId: 0,
    amountBid: 0,
    dateOfBid: ""
  });

  const [loggedIn, setLoggedIn] = useState(true); // only show the bid button if logged in
  const [lastBidder, setLastBidder] =useState("");

  const handleSubmit = (event) => {

    event.preventDefault();
    
    bid.auctionId = props.auction.id;
    bid.dateOfBid = Math.floor(Date.now() / 1000);
    axios
      .post("", bid) // need end point
      .then(response => console.log(response))
      .catch(err => console.log(err));
    console.log(bid);

  };

  const inputChange = (e) => {
    e.persist();
    //validate(e);
    let value = e.target.value;
    value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setBid({ ...bid, [e.target.name]: value });


  }

  useEffect(() => {
    axios
        .get(`https://silent-auction-2.herokuapp.com/user/${props.auction.bidderId}`)
        .then(response => {
            // set up the live auction list
            setLastBidder(response.data.username)
            window.scrollTo(0, 0);
        })
        .catch(err => {
            console.log(err);
        }
        );
}, [])

  return (


    <div className="auctionCard" >
      {/* WE HAVE NO IMAGES IN THE BACKEND SO I HAD TO USE A TERANY */}
      <div className="imageContainer"><img src={props.auction.imgUrl} /></div>
      <h1>{props.auction.title}</h1>
      <p>{props.auction.description}</p>
      <p>Current Bid: <span>${props.auction.bid}</span></p>
      <p>Last bidder: <span>{lastBidder}</span></p>
      <p>Time Left: <span>{props.auction.timeDuration}</span></p>

      {loggedIn ?
        !props.auction.completed ?
        <form onSubmit={handleSubmit}>
          <label htmlFor="amountBid"></label>
          <input
            id="amountBid"
            name="amountBid"
            type="text"
            placeholder="Your bid"
            //value={formData.name}
            onChange={inputChange}
          />

           <div className="buttonContainer" onClick={handleSubmit}><div className="bid">Place Bid</div></div> 

        </form> : ""


        : ""}

    </div>

  );
}

export default AuctionCard;