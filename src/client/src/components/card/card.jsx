import React from 'react';
import './card.scss';
import { Modal } from '../patientmodal/Modal';
import BeatLoader from "react-spinners/BeatLoader";


export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_open:false,
            modal_loading: false,
            patientData: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = async () => {
        
        if (this.state.modal_open){
            this.setState({modal_open:false, modal_loading: false})
        }
        else{
            this.setState({modal_loading: true}, async () => {
                const patientData = await this.props.handlePatientSearch(this.props.patient.id, 500);

                this.setState({modal_loading: false, modal_open: true, patientData: patientData})
            })
        }
    }

    render = () => {

        return(
            <div>
                <div className='card' onClick={this.handleClick}>
                    {this.state.modal_loading ? <BeatLoader color="rgb(97, 208, 255)"></BeatLoader> : <Modal patient_info={this.props.patient} patient_data={this.state.patientData} show={this.state.modal_open} handleClose={this.handleClick}> this.props.patient.name </Modal>}
                    <h1>{this.props.patient.name}</h1>
                    <div className='card-content'>
                        <p>{this.props.patient.birthdate}</p>
                    </div>
                </div>
            </div>
        )
    }
}