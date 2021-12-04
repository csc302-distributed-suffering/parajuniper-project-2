import React from 'react';
import Select from 'react-select';
import './Modal.css';
import './table.scss';
import GROUP_MAPS from'./group_maps';
import Table from 'rc-table';

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
    console.log('here')
    console.log(groups)
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

  generate_table = (group) => {
    if (Object.keys(group).length === 0){
      return
    }
    var columns = []
    var column_values = GROUP_MAPS[group.value]
    column_values.forEach(c_name => {
      columns.push({
          title: c_name,
          dataIndex: c_name,
          key: c_name,
          width: 100 
      }
      )
    });
    var rows_data = this.state.groups[group.value]
    // console.log('rows data')
    // console.log('rows_data ' + JSON.stringify(rows_data, null, 4))
    // console.log('this.state.groups ' + JSON.stringify(this.state.groups, null, 4))
    // console.log('group.value ' + JSON.stringify(group.value, null, 4))
    rows_data.forEach(row_value => {
      // console.log('row value')
      // console.log(row_value)
      console.log('row.value[resource] ' + JSON.stringify(row_value['resource'], null, 4))
      var entry = {}
      var row_res = row_value['resource']
      column_values.forEach(c_name => {
        console.log('c_name ' + JSON.stringify(c_name, null, 4))
        console.log(row_res[c_name])
        // console.log('row_res ' + JSON.stringify(row_res, null, 4))
        // console.log('row_res[c_name]' + JSON.stringify(row_res.c_name, null, 4))
        // entry[c_name] = row_value['resource'][c_name]
      })
      rows_data.push(entry)
    })
    var data = {}
    //temp data below
    const columns2 = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 100,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 200,
      },
      {
        title: 'Operations',
        dataIndex: '',
        key: 'operations',
        render: () => <a href="#">Delete</a>,
      },
    ];
    
    const data2 = [
      { name: 'Jack', age: 28, address: 'some where', key: '1' },
      { name: 'Rose', age: 36, address: 'some where', key: '2' },
    ];
    return <Table columns={columns2} data={data2} />
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
          {this.generate_table(this.state.selectedGroup)}
          <button className="button open_button" type="button" onClick={handleClose}>
            Close
          </button>
          </div>
        </section>
      </div>
    );
  }
};