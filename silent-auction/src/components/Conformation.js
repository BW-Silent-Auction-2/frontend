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
       console.log(props);
     }, []);
    
    return (

        <div className="confirm">
            <h1>Thank you! {location.state.user}</h1>
            
            <div className="buttonContainer" onClick={goHome}><div className="home">Home</div></div>
            
        </div>

    );


}

export default Conformation;