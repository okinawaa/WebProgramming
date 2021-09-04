import {ServiceCardStyled} from "./ServiceCard";
import React from "react";

const CertificationCard = ({image, title, List}) => {
    return (
        <ServiceCardStyled>
            <div className="container">
                <img src={image} alt=""/>
                <h4>{title}</h4>
                <ul>
                    {
                        List.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }
                </ul>
            </div>
        </ServiceCardStyled>
    )
}

export default CertificationCard