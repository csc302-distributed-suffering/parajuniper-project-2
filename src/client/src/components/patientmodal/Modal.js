import React from 'react';
import Select from 'react-select';
import './Modal.css';

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    const groups = this.getGroups(this.props.patient_data);
    const groupOptions = this.getGroupOptions(groups);
    this.state = {
      groups: groups,
      options: groupOptions,
      selectedGroup: groupOptions[0]
    };
  }

  getPath = (obj, path = "") => {
    return path.split(".").reduce((out, key) => out ? out[key] : undefined, obj)
  }

  getGroups = (data) => {
    if (!data || !data.entry) {
      return;
    }
    const groups = {}

    data.entry.forEach(entry => {
        const getPath = this.getPath;
        let resourceType = getPath(entry, "resource.resourceType") || "Other";
        if (resourceType == "Observation") {
            let subType = String(
                getPath(entry, "resource.category.0.text") ||
                getPath(entry, "resource.category.coding.0.code") ||
                getPath(entry, "resource.category.0.coding.0.code") ||
                "Other"
                ).toLowerCase();
            subType = subType.split(/\-+/).map(tok => {
                return tok.charAt(0).toUpperCase() + tok.substr(1)
            }).join(" ");
            resourceType += " - " + subType;
        }
        
        if (!Array.isArray(groups[resourceType])) {
            groups[resourceType] = []
        }
        groups[resourceType].push(entry)
    })
    return groups
  }

  getGroupOptions = (groups) => {
    if (!groups) {
      return [{}];
    }
    const options = [];
    Object.keys(groups).forEach(option => {
      options.push({value: option, label: option})
    });
    return options;
  }

  handleSelection = e => {
    this.setState({selectedGroup: e})
  }
  
  render = () => {
    const {patient_info, handleClose, show} = this.props;
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="modal_content">
          <div className="patient-field title"> {patient_info.name} </div>
          <div className="patient-field">id: {patient_info.id} </div>
          <div className="patient-field">gender: {patient_info.gender} </div>
          <div className="patient-field">birthdate: {patient_info.birthdate} </div>
          <Select options={this.state.options} value={this.state.selectedGroup} onChange={this.handleSelection}/>
          <button className="button" type="button" onClick={handleClose}>
            Close
          </button>
          </div>
        </section>
      </div>
    );
  }
};