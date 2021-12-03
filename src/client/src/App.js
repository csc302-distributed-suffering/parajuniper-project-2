import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import searchIcon from './icons/search.png';
import { CardList } from './components/cardlist/cardlist';
import { Searchbox } from './components/searchbox/searchbox';
import { PatientModal } from './components/patientmodal/PatientModal';
import { getPatientsWName, getPatient } from './actions/patients';
import { SearchBar } from './components/searchbar/SearchBar';
import BeatLoader from "react-spinners/BeatLoader";
// import {View, Modal, Text} from 'react-native'


class App extends Component {
  patientList = []

  constructor() {
    super();
    this.state = {
      patients: this.patientList,
      searchPatientFirstName: "Harland",
      searchPatientLastName: "",
      searchCount: 200,
      nextPageLink: "",
      loading: false,
      searchResult: true,
      tags: [
        { type: "firstName", value: "Harland", text: "firstName: Harland", id: "firstName: Harland"}
     ],
     suggestions: [
      { type: "firstName", value: "John", text: "firstName: John" },
      ],
      field: [{ value: 'firstName', label: 'firstName' }]
    }
  }

    render(){
        return (
          <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => (
              <div className="App">
                <div>
                <SearchBar 
                onInputChange={this.handleTagUpdates} 
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                tags={this.state.tags}
                field={this.state.field}
                />
                </div>
                <div id='searchbar'>
                      <Searchbox type='search' id="patientSearch-1" name="searchPatientFirstName" placeholder='First Name' onInputChange={this.handleSearchInputChange}/>
                  <Searchbox type='search' id="patientSearch-2" name="searchPatientLastName" placeholder='Last Name' onInputChange={this.handleSearchInputChange}/>

                  <button id='searchButton' title='Change displayed fields' className="vertical-center" onClick={this.handlePatientListSearch}>
                    <img src={searchIcon} alt='Search' id='searchIcon'/>
                    </button>
                </div>
                { this.state.loading
                ? <BeatLoader color="rgb(97, 208, 255)"></BeatLoader>
                : <CardList patients={this.state.patients} searchResult={this.state.searchResult} handlePatientSearch={this.handleSpecificPatientSearch}/>
                }
              </div>
              )}
            />          
          </Switch>
        </BrowserRouter>
        );
    }

  handleSearchInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }


  handlePatientListSearch = async () => {
    console.log(this.state)
    this.setState({loading: true}, async () => {
      const res = await getPatientsWName(this.state.searchPatientFirstName, this.state.searchPatientLastName, this.state.searchCount);

      if (res.status !== 200) {
        console.error(`Error retrieving patients. Code ${res.status}`);
        return;
      }
  
      this.patientList = []
      if (res.data.patients) {
        for (const p of res.data.patients) {
          //console.log(p)
          const name = this.getPatientName(p);
  
          const patient = {
            name: name,
            id: p.id,
            gender: p.gender,
            birthdate: p.birthDate,
          };
  
          this.patientList.push(patient);
        }
      }
  
      this.setState({
        patients: this.patientList,
        loading: false,
        searchResult: this.patientList.length !== 0,
      });
    })
  };

  handlePatientIdSearch = async (id, count = 100) => {
    console.log("id search called")
    const res = await getPatient(id, count);
    
    this.setState({loading: true}, async () => {
      const res = await getPatient(id, this.state.searchCount);
      if (!res){
        console.log("no patient with such id")
        return;
      }
      if (res.status !== 200) {
        console.error(`Error retrieving patients. Code ${res.status}`);
        
      }
  
      this.patientList = []
      const p = res.data.patient;
      const name = this.getPatientName(p);
      const patient = {
        name: name,
        id: p.id,
        gender: p.gender,
        birthdate: p.birthDate,
      }

          this.patientList.push(patient);
  
      this.setState({
        patients: this.patientList,
        loading: false,
        searchResult: this.patientList.length !== 0,
      });
    })
    
    // return res.data
  }

  getPatientName = (patient) => {
    let cName = '';
    for (const name of patient.name) {
      if (name.use === 'official') {
        return `${name.given} ${name.family}`; 
      }

      cName = `${name.given} ${name.family}`
    }

    return cName;
  };

  handleSpecificPatientSearch = async (id, count = 100) => {
    const res = await getPatient(id, count);
    
    if(res.status !== 200){
      console.error(`Error retrieving patients. Code ${res.status}`);
      return null;
    }
    return res.data
  }
  
  handleTagUpdates = (tags, type='add') => {
    for (let i = 0; i < tags.length; i++) {
      var tag = tags[i]
      if (tag.type == 'id'){
        var that = this
        that.handlePatientIdSearch(tag.value)
        
      }
      else if (tag.type == 'firstName' || tag.type == 'lastName'){
        
        if (tag.type == 'firstName'){
          if (type=="del"){
            this.setState({searchPatientFirstName: ''})
            return
          }
          this.setState({searchPatientFirstName: tag.value})
        }
        else if (tag.type == 'lastName'){
          if (type=='del'){
            this.setState({searchPatientLastName: ''})
            return
          }
          this.setState({searchPatientLastName: tag.value})
        }
  
      }
    }

  }
  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
     tags: tags.filter((tag, index) => index !== i),
    });
    this.props.onInputChange(this.state.tags, 'del')
    console.log('tag deleted')
    if (this.state.tags[i].type == 'id'){
      this.handlePatientListSearch()

    }
  }

  handleAddition(tag) {
      tag.value = tag.text
      tag.text = this.state.field[0].value + ': ' + tag.text
      tag.type = this.state.field[0].value
      tag.id = tag.text
      // console.log('handle add tags: ' + String(this.state.tags))
      this.setState(state => ({ tags: [...state.tags, tag] }));
      this.props.onInputChange([tag], 'add')
  }
}

export default App;
