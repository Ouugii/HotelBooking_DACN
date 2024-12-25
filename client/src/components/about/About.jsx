import "./about.css"
import React from "react";

import { Link, useNavigate } from "react-router-dom";


const About = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/");
      };
    const handleAbout = () => {
        navigate("/About-us")
        
    }
    return(
        <div className="wrapper-a">
             
            <div className="Home" onClick={handleHome}>
            <h1 className="a-contentL">HOME</h1>
            </div>
            <div className="About" onClick={handleAbout}>
             <h1 className="a-contentR">ABOUT US</h1>
            </div>

        </div>
    
    )
}


export default About