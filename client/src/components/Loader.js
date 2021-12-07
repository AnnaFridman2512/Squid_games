import React, { Fragment } from "react";
import Animation from '../images/handing_business_card.gif';

export default function Loader(){

    return (
        <Fragment>
        <img src={Animation} alt="handing_business_card" style={{ display: 'block', margin:'auto'}}/>
    </Fragment>
    )

   
    
}