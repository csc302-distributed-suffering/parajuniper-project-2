import React from 'react';
import './cardlist.css';

import { Card } from '../card/card';

export const CardList = (props) => {
    return(
        <div className='cardlist'>
            {props.patients.map(patient => (
                <Card key={patient.id} patient={patient}/>
            ))}
        </div>
    )}