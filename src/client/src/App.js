import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import searchIcon from './icons/search.png';
import { CardList } from './components/cardlist/cardlist';
import { Searchbox } from './components/searchbox/searchbox';
import { getPatientsWName, getPatient } from './actions/patients';

class App extends Component {
  patientList = [
    // {
    //   name: 'John Smith',
    //   id: '1',
    //   sex: 'Male',
    //   birthdate: '09/12/1947'
    // },
    // {
    //   name: 'Jean Levin',
    //   id: '2',
    //   sex: 'Female',
    //   birthdate: '02/24/1987'
    // }
  ]

  constructor() {
    super();
    this.state = {
      patients: this.patientList,
      searchPatientFirstName: "",
      searchPatientLastName: "",
      searchCount: 200,
      nextPageLink: "",
      patientInfoLoaded: true,
      searchResult: true,
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
              { true
               ? <CardList patients={this.state.patients} searchResult={this.state.searchResult}/>
               : null

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
    const res = await getPatientsWName(this.state.searchPatientFirstName, this.state.searchPatientLastName, this.state.searchCount);

    if (res.status != 200) {
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
      patientInfoLoaded: true,
      searchResult: this.patientList.length !== 0,
    });
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

  handleSpecificPatientSearch = async () => {
    const res = await getPatient(this.state.searchPatientId, this.state.searchCount);
  }
}

export default App;
