import '../css/index.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import AuctionCard from './AuctionCard';
import Auction from "../data/auctionData" // dummy auction data use to start project

const MainContainer = props => {

    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        axios
            .get(`https://silent-auction-2.herokuapp.com/auth/users/auction/all`)
            .then(response => {
                // set up the live auction list
                setAuctions(response.data);
                window.scrollTo(0, 0);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            }
            );
    }, [])


    return (
        <div className="mainContainer">
            <div className="content" >
                {/* map over the auctions and disply them*/}
                {auctions.map((auction, i) => {
                    return <AuctionCard key={auction.id} auction={auction} />;
                })}
            </div>
        </div>

    );
}

export default MainContainer;