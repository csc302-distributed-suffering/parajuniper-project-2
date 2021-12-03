import React from 'react';
import './navbuttons.css';

export class Navbuttons extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const disablePrev = this.props.page === 1;
        const disableNext = !this.props.nextLink;
        if (this.props.searchResult & this.props.patientNum != 0) {
            return(
                <div className='navbuttons'>
                    <button className='navb prev' onClick={this.props.handlePrev} disabled={disablePrev}>&laquo; Previous</button>
                    <button className='navb next' onClick={this.props.handleNext} disabled={disableNext}>Next &raquo;</button>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }
}