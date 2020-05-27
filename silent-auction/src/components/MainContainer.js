import '../css/index.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import AuctionCard from './AuctionCard';
import Auction from "../data/auctionData"

const MainContainer = props => {

    const [auctions, setAuctions] = useState([]);

    useEffect(() => {


        axios
          .get(`https://silent-auction-2.herokuapp.com/auth/users/auction/all`)
          .then(response => {
            // set up the live auction list
            setAuctions(response.data);
            console.log(auctions);
            window.scrollTo(0, 0);
          })
          .catch(err => {
            console.log(err);
          }
          );
      }, [])


    return (
        <div className = "mainContainer">
        <div className="content" >
            {auctions.map((auction, i) => {
                return <AuctionCard key={auction.id} auction={auction} />;
            })}
        </div>
       </div>

    );
}

export default MainContainer;