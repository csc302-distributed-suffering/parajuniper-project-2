import React from 'react';
import './card.css';
import { Modal } from '../patientmodal/Modal';

export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_open:false
        };
        // this.modal_open = this.modal_open.bind(this);
        this.handleClick = this.handleClick.bind(this);
      }
    handleClick = () => {
        
        if (this.state.modal_open){
            this.setState({modal_open:false})
        }
        else{
            this.setState({modal_open:true})
        }
    }

    render = () => {

        return(<div>
        <div className='card' >
            <Modal patient_info={this.props.patient} show={this.state.modal_open} handleClose={this.handleClick}> this.props.patient.name </Modal>
                <h1>{this.props.patient.name}</h1>
                <p>{this.props.patient.sex}</p>
                <p>{this.props.patient.birthdate}</p>
                <button className="button" onClick={this.handleClick}> "view details"</button>
            </div>
            </div>
        )
    }
}