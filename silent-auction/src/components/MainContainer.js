import '../css/index.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import AuctionCard from './AuctionCard';
import Auction from "../data/auctionData"

const MainContainer = props => {

    const [auctions, setAuction] = useState([]);

    useEffect(() => {


        axios
          .get(`https://silent-auction-2.herokuapp.com/auth/users/auction/all`)
          .then(response => {
            // set up the live auction list
            //setAuction(response.data.results);
            console.log(response);
            window.scrollTo(0, 0);
          })
          .catch(err => {
            console.log(err);
          }
          );
      }, [auctions])


    return (
        <div className = "mainContainer">
        <div className="content" >
            {/* yes we need to map over the auctions when I have access. For now just dummy data */}
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/> 
           <AuctionCard auction={Auction}/>
        </div>
       </div>

    );
}

export default MainContainer;