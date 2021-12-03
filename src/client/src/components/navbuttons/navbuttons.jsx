import React from 'react';

export class Navbuttons extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        if (this.props.searchResult & this.props.patientNum != 0) {
            return(
                <div>
                    <button onClick={this.props.handlePrev} disabled={this.props.page === 1}>Previous</button>
                    <button onClick={this.props.handleNext} disabled={!this.props.nextLink}>Next</button>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }
}