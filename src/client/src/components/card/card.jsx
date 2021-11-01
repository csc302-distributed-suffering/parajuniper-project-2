import React from 'react';
import './card.css';

export const Card = props => {
    return(
        <div className='card'>
            <h1>{props.patient.name}</h1>
            <p>{props.patient.sex}</p>
            <p>{props.patient.birthdate}</p>
        </div>
    )
}