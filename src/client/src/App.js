import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import searchIcon from './icons/search.png';
import { CardList } from './components/cardlist/cardlist';
import { Searchbox } from './components/searchbox/searchbox';
import { PatientModal } from './components/patientmodal/PatientModal';
import { getPatientsWName, getPatient, getAllPatientData } from './actions/patients';
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

              <div className='header'>
                <div className="header-content">
                  <h1 className="header-title" >Suffering</h1>
                  <p >
                    A FHIR based someting blah blah that gets you patient data
                  </p>
                  <a className="header-link" href="https://www.hl7.org/fhir/" target="_blank">About FHIR </a>
                  <i class="fas fa-fire-alt"></i>
                </div>
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
               : <CardList patients={this.state.patients} searchResult={this.state.searchResult} handlePatientSearch={this.handlePatientDataSearch}/>
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
    this.setState({loading: true}, async () => {
      const res = await getPatientsWName(this.state.searchPatientFirstName, this.state.searchPatientLastName, this.state.searchCount);

      if (res.status !== 200) {
        console.error(`Error retrieving patients. Code ${res.status}`);
        return;
      }
  
      this.patientList = []
      if (res.data.patients) {
        for (const p of res.data.patients) {
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

  handlePatientDataSearch = async (id, count = 100) => {
    const res = await getAllPatientData(id, count);
    
    if(res.status !== 200){
      console.error(`Error retrieving patient data. Code ${res.status}`);
      return null;
    }

    return res.data
  }
}

export default App;
