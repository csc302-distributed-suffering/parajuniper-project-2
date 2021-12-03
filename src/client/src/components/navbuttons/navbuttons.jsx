import React from 'react';
import './navbuttons.css';

export class Navbuttons extends React.Component {
    render = () => {
        if (this.props.searchResult & this.props.patientNum !== 0) {
            return(
                <div className='navbuttons'>
                    <button className='navb prev' onClick={this.props.handlePrev} disabled={this.props.page === 1}>&laquo; Previous</button>
                    <button className='navb next' onClick={this.props.handleNext} disabled={!this.props.nextLink}>Next &raquo;</button>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }
}