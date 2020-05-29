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
    
    return (
        <div className="confirm">
            {!location.state.type ? <div className="confirmContainer"><h1>Thank you! {location.state.user}</h1>
            <p>Your account has been created.</p></div> : <div className="confirmContainer"><h1>Thank you!</h1>
            <p>Your auctuion with the title {location.state.auction} has been created.</p></div>}
                       
            <div className="buttonContainer" onClick={goHome}><div className="home">Home</div></div>
            
        </div>

    );


}

export default Conformation;