import '../css/index.css';

import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Conformation = props => {
    const location = useLocation();

    const history = useHistory();

    function goHome() {
        history.push("/");
    }
    
    useEffect(() => {
       
     }, []);

    function buildResponce(confirmType){
        if(confirmType === 0){ // we have a new user
            return <div className="confirmContainer"><h1>Thank you! {location.state.user}</h1>
            <p>Your account has been created.</p></div>;

        } else if (confirmType === 1){ // we have a new acution
            return <div className="confirmContainer"><h1>Thank you!</h1>
            <p>Your auctuion with the title {location.state.auction} has been created.</p></div>;

        } else if (confirmType === 3){ // we have a new bid
            return <div className="confirmContainer"><h1>Thank you!</h1>
            <p>Your bid for ${location.state.bid} has been accepted.</p></div>;       
        }
       
    } 
    
    return (
        <div className="confirm">
            
            {buildResponce(location.state.type)}
                       
            <div className="buttonContainer" onClick={goHome}><div className="home">Home</div></div>
            
        </div>

    );


}

export default Conformation;