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
      searchPatientFirstName: "",
      searchPatientLastName: "",
      searchCount: 200,
      nextPageLink: "",
      loading: false,
      searchResult: true,
      
    }
  }


  render(){
      return (
        <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (
            <div className="App">
              <div>
              <SearchBar onInputChange={this.handleTagUpdates}/>
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
  
  handleTagUpdates = (tags) => {
    this.setState({searchPatientFirstName: ''})
    this.setState({searchPatientLastName: ''})
    for (let i = 0; i < tags.length; i++) {
      var tag = tags[i]
      if (tag.type == 'id'){
        this.handleSpecificPatientSearch(tag.value)
      }
      else if (tag.type == 'firstName' || tag.type == 'lastName'){
        if (tag.type == 'firstName'){
          console.log("firstname called")
          this.setState({searchPatientFirstName: tag.value})
          
        }
        else if (tag.type == 'lastName'){
          this.setState({searchPatientLastName: tag.value})
        }
  
      }
    }
    console.log("IT WAS CALLED" + String(tags))
    console.log(tags)
    console.log(this.state)
  }
}

export default App;
