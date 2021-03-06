import React from 'react';
import Select from 'react-select';
import './Modal.scss';
import './table.scss';
import GROUP_MAPS from'./group_maps';
import Table from 'rc-table';
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    const groups = this.getGroups(this.props.patient_data);
    const groupOptions = this.getGroupOptions(groups);
    this.state = {
      groups: groups,
      options: groupOptions,
      selectedGroup: groupOptions[0],
      columns: [],
      rows: []
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
        
        if (resourceType in GROUP_MAPS) {
          if (!Array.isArray(groups[resourceType])) {
            groups[resourceType] = []
          }
          groups[resourceType].push(entry)
        }
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

  generate_table = (group) => {
    this.state.rows = []
    this.state.columns = []
    if (Object.keys(group).length === 0){
      return
    }
    var columns = []
    var column_values = GROUP_MAPS[group.value]
    column_values.forEach(c => {
      var c_name = c[0]
      if (c_name.split(".")[1]) {
        c_name = c_name.split(".")[1]
      }
      var c_width = c[1]
      columns.push({
          title: c_name,
          dataIndex: c_name,
          key: c_name,
          width: c_width != 0? c_width : 150
      }
      )
      this.state.columns.push(c_name)
    });
    var rows_final = []
    var rows_data = this.state.groups[group.value]
    rows_data.forEach(row_value => {
      var row_clean = []
      var entry = {}
      var row_res = row_value['resource']
      
      column_values.forEach(c => {
        var c_name = c[0]
        row_clean.push(row_res[c_name])
        var c_name_t = c_name
        if (c_name.split(".")[1]) {
          const name = c_name.split(".")
          c_name_t = name[1]
          c_name = name[0]
        }
        let skip = false
        let current = ""
        try{
          current = row_value['resource'][c_name]
          if (c[2]) {
            const path = c[2].split(".")
            path.pop()
            path.forEach(name => {
              current = current[name]
            })
          }
        } catch (e) {
          entry[c_name_t] = "N/A"
          skip = true
        }
        if (current == undefined || current == null) {
          entry[c_name_t] = "N/A"
          skip = true
        }
        if (c[2] && !skip) {
          const lastKey = c[2].split(".").pop()
          if (c[3] === "r" && !skip) {
            const values = []
            current.forEach(e => {
              try {
                values.push(e[lastKey])
              } catch (e) {
                return
              }
            })
            entry[c_name_t] = values.join(", ");
          } else if (!skip) {
            try {
              entry[c_name_t] = current[lastKey]
            } catch (e) {
              entry[c_name_t] = "N/A"
            }
          }
        } else if (!skip){
          entry[c_name_t] = row_value['resource'][c_name]
        }
      })
      rows_final.push(entry)
      this.state.rows.push(row_clean)
    })
    this.state.rows = rows_final
    return <Table columns={columns} data={rows_final} />
  }
  
  generate_basic_info = () => {
    // creates the basic info for a patient
 
    if (this.state.groups){
   
      const patient_data = this.state.groups['Patient'][0]['resource']
      const patient_basic_info = this.props;
      const gender = patient_basic_info['patient_info'].gender
      const id = patient_basic_info['patient_info'].id
      const birthdate = patient_basic_info['patient_info'].birthdate
      const phone = (patient_data['telecom'] ? patient_data['telecom'][0]['value'] : 'Unknown')
      const email = (patient_data['email'] ? patient_data['email'][0]: 'Unknown')
      let address = ''
      if (patient_data['address']){
        var address_data = patient_data['address'][0]
        address = '' + (address_data['line'] ? address_data.line[0] : '') + ' ' + address_data['city'] 
        + ' ' + address_data['state'] + ' ' + address_data['postalCode'] + ' ' + address_data['country'];
      }
      else {
        address = 'Unknown' 
      }

      return (
        <div className='basic-info'>
        <div class="row">
        <div class="col-sm-6">
          <p><span className="strong-text"> Gender:</span>  {gender}</p>
          <p><span className="strong-text"> Born:</span>  {birthdate}</p>
          <p><span className="strong-text"> ID:</span>  {id}</p>
        </div>
        <div class="col-sm-6" >
          <p><span className="strong-text"> Phone: </span>  {phone}</p>
          <p><span className="strong-text"> Email: </span>  {email}</p>
          <p><span className="strong-text"> Address: </span>  {address}</p>
        </div>
      </div>
      </div>
      )
    }
    
  }
  
  render = () => {
    const {patient_info, handleClose, show} = this.props;
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="modal_content">
          <div className="patient-field title"> {patient_info.name} </div>
          {this.generate_basic_info()}
          <Select className="group-field" options={this.state.options.sort((a, b) => a.value - b.value)} value={this.state.selectedGroup} onChange={this.handleSelection}/>
          {this.generate_table(this.state.selectedGroup)}
          <div class="row">
          <div class="col-auto">
          <div class="col">
            <button className="button close red" type="button" onClick={handleClose}>
              Close
            </button>
            </div>
            </div>
            <div class="col-auto">
            <div class="col">
            <button className="button close ">
          <CSVLink className='linktext' data={this.state.rows}>Download Table</CSVLink>
          </button>
          </div>
          </div>
          <div class="col-auto">
          <div class="col">
            <button className="button close">
              <a 
                type="button"
                className='linktext'
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(this.state.groups, null, 4)
                )}`}
                download={patient_info.name + ".json"}
              >
                Download All
              </a>
            </button>
          </div>
          </div>
          </div >
          </div>
        </section>
      </div>
    );
  }
};