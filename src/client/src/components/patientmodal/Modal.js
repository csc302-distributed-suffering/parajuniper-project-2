import React from 'react';
import Select from 'react-select';
import './Modal.scss';
import './table.scss';
import GROUP_MAPS from'./group_maps';
import Table from 'rc-table';
import { jsPDF } from "jspdf";

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

  handleDownload = ()=>{
    const doc = new jsPDF();
    console.log("here")
    console.log(this.state.groups)
    const id = this.state.groups['Patient'][0]['resource']['id']
    const last_name = this.state.groups['Patient'][0]['resource']['name'][0]['family']
    const first_name = this.state.groups['Patient'][0]['resource']['name'][0]['given'][0]
    console.log(first_name + ' ' + last_name)
    doc.text("GROUP" + this.state.selectedGroup.value, 20, 20);
    doc.text(JSON.stringify(this.state.columns), 20, 30);
    var cur_row = 40
    this.state.rows.forEach(row=>{
      doc.text(JSON.stringify(row), 20, cur_row);
      cur_row += 10;
    })
    doc.save(first_name + ' ' + last_name + ' ' + this.state.selectedGroup + ".pdf");
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
          width: c[1] != 0? c[1] : 150
      }
      )
    });
    var rows_final = []
    var rows_data = this.state.groups[group.value]
    // console.log('group.value ' + JSON.stringify(group.value, null, 4))
    rows_data.forEach(row_value => {
      console.log('row.value[resource] ' + JSON.stringify(row_value['resource'], null, 4))
      var entry = {}
      var row_res = row_value['resource']
      column_values.forEach(c => {
        var c_name = c[0]
        var c_name_t = c_name
        if (c_name.split(".")[1]) {
          const name = c_name.split(".")
          c_name_t = name[1]
          c_name = name[0]
        }
        console.log('c_name ' + JSON.stringify(c_name, null, 4))
        console.log(row_res[c_name])
        // console.log('row_res ' + JSON.stringify(row_res, null, 4))
        // console.log('row_res[c_name]' + JSON.stringify(row_res.c_name, null, 4))
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
    })

    this.state.columns = columns
    this.state.rows = rows_final
    return <Table columns={columns} data={rows_final} />
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
          <Select className="group-field" options={this.state.options} value={this.state.selectedGroup} onChange={this.handleSelection}/>
          {this.generate_table(this.state.selectedGroup)}
          <button className="button close" type="button" onClick={handleClose}>
            Close
          </button>
          <button className="button close" type="button" onClick={this.handleDownload}>
            Download
          </button>
          </div>
        </section>
      </div>
    );
  }
};