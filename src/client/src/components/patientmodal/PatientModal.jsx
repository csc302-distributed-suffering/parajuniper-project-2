import React from 'react';
const display = {
    display: 'block'
  };
const hide = {
    display: 'block'
  };
  
  
  export class PatientModal extends React.Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {toggle: props.modal_open};
    }
  
    toggle(event) {
      this.setState((prevState) => ({
        toggle: !prevState.toggle
      }));
    }
    render() {
        return(
            <div>sasdas</div>
        )
    }
  }
  
