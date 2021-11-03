import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import searchIcon from './icons/search.png';
import { CardList } from './components/cardlist/cardlist';
import { Searchbox } from './components/searchbox/searchbox';
import { getPatientsWName, getPatient } from './actions/patients';

class App extends Component {
  patientlist = [
    {
      name: 'John Smith',
      id: '1',
      sex: 'Male',
      birthdate: '09/12/1947'
    },
    {
      name: 'Jean Levin',
      id: '2',
      sex: 'Female',
      birthdate: '02/24/1987'
    }
  ]

  constructor() {
    super();
    this.state = {
      patients: this.patientlist,
      searchPatientFirstName: "",
      searchPatientLastName: "",
      searchCount: 10,
      nextPageLink: "",
      patientInfoLoaded: false
    }
  }

  render(){
      return (
        <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (
            <div className="App">
              <div id='searchbar'>
                <Searchbox type='search' id="patientSearch-1" name="searchPatientFirstName" placeholder='First Name' onInputChange={this.handleSearchInputChange}/>
                <Searchbox type='search' id="patientSearch-2" name="searchPatientLastName" placeholder='Last Name' onInputChange={this.handleSearchInputChange}/>

                <button id='searchButton' title='Change displayed fields' className="vertical-center" onClick={this.handlePatientListSearch}>
                  <img src={searchIcon} alt='Search' id='searchIcon'/>
                  </button>
              </div>
              <CardList patients={this.state.patients}/>
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
    const res = await getPatientsWName(this.state.searchPatientFirstName, this.state.searchPatientLastName, this.state.searchCount);
  }

  handleSpecificPatientSearch = async () => {
    const res = await getPatient(this.state.searchPatientId, this.state.searchCount);
  }
}

export default App;
