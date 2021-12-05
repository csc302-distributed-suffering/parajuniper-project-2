import React from 'react';
import './cardlist.css';

import { Card } from '../card/card';

export class CardList extends React.Component {
    SearchRender = () => {
        if (this.props.searchResult) {
            return this.props.patients.map(patient => (
                <Card key={patient.id} patient={patient} handlePatientSearch={this.props.handlePatientSearch}/>
            ))
        } else {
            return <div className='center-text'><p className='center-text'> No results found!</p></div>
        }
    }

    render() {
        return(
            <div className='center-text'>
                {this.props.patients.length === 0 && this.props.searchResult
                    ? <p className='center-text'>Search for a patient name to get started!</p>
                    : <div className='cardlist'><this.SearchRender /></div>
                }
            </div>
        );
    }
}