import React from 'react';
import './searchbox.css';

export const Searchbox = props => {
    const {onInputChange, name, id, placeholder} = props;

    return(
        <input 
            className='searchbox'
            name={name}
            id={id}
            placeholder={placeholder}
            onChange={(e) => {onInputChange(e)}}
        />
    )
}