import React from 'react';
import './cardlist.css';

import { Card } from '../card/card';

export const CardList = (props) => {
    return(
        <div className='cardlist'>
            {props.patients.length === 0
                ? <p>Search for a patient name to get started!</p>
                : props.patients.map(patient => (
                    <Card key={patient.id} patient={patient}/>
                ))
            }
        </div>
    )}