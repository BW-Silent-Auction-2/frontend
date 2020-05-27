import React , {useState} from 'react';
import '../css/index.css';
import { Link } from 'react-router-dom';

const AuctionCard = props => {
  const [currentBid, setCurrentBid] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false); // only show the bid button if logged in
  //setCurrentBid(props.auction.currentBid);
  
  return (
    
    
      <div className="auctionCard" >
          {/* WE HAVE NO IMAGES IN THE BACKEND SO I HAD TO USE A TERANY */}
          {props.auction.images ? <div className="imageContainer"><img src={props.auction.images[0]}/></div> : ""}
          <h1>{props.auction.title}</h1>
          <p>{props.auction.description}</p>
          <p>Current Bid: <span>${currentBid}</span></p>
          <p>Time Left: <span>1day 2h 32sec</span></p>

          {loggedIn ? <div className="buttonContainer"><div className="bid">Bid</div></div> : ""}
                          
       </div>
    
  );
}

export default AuctionCard;