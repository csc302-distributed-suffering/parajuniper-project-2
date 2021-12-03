import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import searchIcon from './icons/search.png';
import { CardList } from './components/cardlist/cardlist';
import { Searchbox } from './components/searchbox/searchbox';
import { Navbuttons } from './components/navbuttons/navbuttons';
import { PatientModal } from './components/patientmodal/PatientModal';
import { getPatientsWName, getPatientsWLink, getPatient } from './actions/patients';
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
      searchCount: 40,
      nextPageLink: "",
      previousPageLink: "",
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
<<<<<<< HEAD
               : <CardList patients={this.state.patients} searchResult={this.state.searchResult} handlePatientSearch={this.handlePatientDataSearch}/>
=======
               : <div>
                  <CardList patients={this.state.patients} searchResult={this.state.searchResult} handlePatientSearch={this.handleSpecificPatientSearch}/>
                  <Navbuttons patientNum={this.state.patients.length} searchResult={this.state.searchResult} 
                    handleNext={this.handleNextPage} handlePrev={this.handlePrevPage} nextLink={this.state.nextPageLink} prevLink={this.state.previousPageLink}/>
                 </div>
>>>>>>> Add pagination
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
        nextPageLink: res.data.nextPageLink,
        previousPageLink: ""
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

<<<<<<< HEAD
  handlePatientDataSearch = async (id, count = 100) => {
    const res = await getAllPatientData(id, count);
    
    if(res.status !== 200){
      console.error(`Error retrieving patient data. Code ${res.status}`);
      return null;
    }

    return res.data
=======
  handlePrevPage = () => {
    if (!this.state.previousPageLink) {
      console.log("No prev page");
      return;
    }
    this.handlePagination(this.state.previousPageLink);
  }

  handleNextPage = () => {
    if (!this.state.nextPageLink) {
      console.log("No next page");
      return;
    }
    this.handlePagination(this.state.nextPageLink);
  }

  handlePagination = (url) => {
    this.setState({loading: true}, async () => {
      const res = await getPatientsWLink(this.state.nextPageLink);

      if (res.status !== 200) {
        console.error(`Error retrieving patients. Code ${res.status}`);
        return;
      }
      
      this.patientList = []
      if (res.data.entry) {
        for (const p of res.data.entry) {
          if (!p.resource) {
            continue;
          }
          const resource = p.resource
          const name = this.getPatientName(resource);
  
          const patient = {
            name: name,
            id: resource.id,
            gender: resource.gender,
            birthdate: resource.birthDate,
          };
  
          this.patientList.push(patient);
        }
      }

      const links = {next: "", previous: ""};
      if (res.data.link) {
        for (const l of res.data.link) {
          if (l.relation === "next") {
            links.next = l.url;
          } else if (l.relation === "previous") {
            links.previous = l.url
          }
        }
      }
  
      this.setState({
        patients: this.patientList,
        loading: false,
        searchResult: this.patientList.length !== 0,
        previousPageLink: links.previous,
        nextPageLink: links.next
      });
    })
>>>>>>> Add pagination
  }
}

export default App;
