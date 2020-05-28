import '../css/index.css';

import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

const Conformation = props => {

    function handleSubmit() {

    }
    
    useEffect(() => {
       //console.log(props.response); // result: 'some_value'
     }, [props.response]);
    
    return (

        <div className="confirm">
            <h1>Thank you!</h1>
            <div className="buttonContainer" onClick={handleSubmit}>
            <div className="signup">Submit</div></div>
        </div>

    );


}

export default Conformation;