import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import searchIcon from './icons/search.png';
import { CardList } from './components/cardlist/cardlist';
import { Searchbox } from './components/searchbox/searchbox';
import { Navbuttons } from './components/navbuttons/navbuttons';
import { getPatientsWName, getPatientByID, getPatientList, getPage,  } from './actions/patients';
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
      page: 1,
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
                    handleNext={this.handleNextPage} handlePrev={this.handlePrevPage} nextLink={this.state.nextPageLink} page={this.state.page}/>
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

  getLinks = (bundle) => {
    console.log('BUNDLE', bundle);
    const links = {next: '', previous: ''};

    if (!bundle.link) {
      return links;
    }

  
    for (const link of bundle.link) {
      if (link.relation === 'next') {
        links.next = link.url;
      } else if (link.relation === 'previous') {
        links.previous = link.url;
      }
    }
    return links;
  }

  handlePatientListSearch = async () => {
    this.setState({loading: true}, async () => {
      const res = await getPatientsWName(this.state.searchPatientFirstName, this.state.searchPatientLastName, this.state.searchCount);

      console.log(res);

      if (res.status !== 200) {
        console.error(`Error retrieving patients. Code ${res.status}`);
        return;
      }
  
      this.patientList = []
      if (res.data.patients) {
        for (const p of res.data.patients) {
          console.log(p.id);
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

      // const links = this.getLinks(res.data);
  
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

    if (!patient.name) {
      return 'Unknown';
    }

    for (const name of patient.name) {
      if (name.use === 'official') {
        return `${name.given} ${name.family}`; 
      }

      cName = `${name.given} ${name.family}`
    }

    return cName;
  };

  // parseQueryString = (url) => {
  //   const urlSplit = url.split('?');
  //   if (urlSplit.length !== 2) {
  //     return {};
  //   }

  //   const qString = urlSplit[1];
  //   const params = qString.split('&');
  //   const queries = {};
  //   for (const q of params) {
  //     const qSplit = q.split('=');
  //     if (qSplit.length !== 2) continue;
  //     queries[qSplit[0]] = qSplit[1];
  //   }

  //   return queries;
  // }

  handleSpecificPatientSearch = async (id, count = 100) => {
    console.log(id, count);
    const res = await getPatientByID(id, count);
    
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
    if (!this.state.previousPageLink || this.state.page === 1) {
      console.log("No prev page");
      return;
    }
    this.handlePagination(this.state.previousPageLink, 'PREV');
  }

  handleNextPage = () => {
    if (!this.state.nextPageLink) {
      console.log("No next page");
      return;
    }
    this.handlePagination(this.state.nextPageLink, 'NEXT');
  }

  handlePagination = (url, method) => {
    this.setState({loading: true}, async () => {
      const res = await getPage(url);

      if (res.status !== 200) {
        console.error(`Error retrieving patients. Code ${res.status}`);
        return;
      }

      const links = this.getLinks(res.data);
      
      this.patientList = []
      if (res.data.entry){
        for (const entry of res.data.entry) {
          const p = entry.resource;
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

      let page = this.state.page;
      if (method === 'NEXT') {
        page++;
      } else {
        page--;
      }
  
      this.setState({
        patients: this.patientList,
        loading: false,
        searchResult: this.patientList.length !== 0,
        previousPageLink: links.previous,
        nextPageLink: links.next,
        page: page
      });
      console.log('STATE AFTER', this.state);
    })
>>>>>>> Add pagination
  }
}

export default App;
