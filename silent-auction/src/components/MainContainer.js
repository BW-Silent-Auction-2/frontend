import '../css/index.css';
import React, { useState } from 'react';

import AuctionList from './ActionList';

import {Route} from 'react-router-dom';

import AuctionCard from './AuctionCard';
import Auction from "../data/auctionData"

const MainContainer = props => {

    return (
        <div className = "mainContainer">
        <div className="content" >
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