import React from 'react';
import './cardlist.css';

import { Card } from '../card/card';

export class CardList extends React.Component {
    SearchRender = () => {
        if (this.props.searchResult) {
            return this.props.patients.map(patient => (
                <Card key={patient.id} patient={patient}/>
            ))
        } else {
            return <p>No results found!</p>
        }
    }

    render() {
        return(
            <div className='cardlist'>
                {this.props.patients.length === 0 && this.props.searchResult
                    ? <p>Search for a patient name to get started!</p>
                    : <this.SearchRender />
                }
            </div>
        );
    }
}

// export const CardList = (props) => {
//     return(
//         <div className='cardlist'>
//             {props.patients.length === 0 && props.searchResult
//                 ? <p>Search for a patient name to get started!</p>
//                 : props.patients.map(patient => (
//                     <Card key={patient.id} patient={patient}/>
//                 ))
//             }
//         </div>
//     )}