import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import searchIcon from './icons/search.png';
import { CardList } from './components/cardlist/cardlist';
import { Searchbox } from './components/searchbox/searchbox';
import { Navbuttons } from './components/navbuttons/navbuttons';
import { getPatientsWName, getPatientByID, getPatientList, getPage,  } from './actions/patients';
import BeatLoader from "react-spinners/BeatLoader";
import { TagSearch } from './components/tagsearch/TagSearch.js';
// import {View, Modal, Text} from 'react-native'


class App extends Component {
  patientList = []

  constructor() {
    super();
    this.state = {
      patients: this.patientList,
      searchPatientFirstName: "",
      searchPatientLastName: "",
      searchPatientID: "",
      searchCount: 40,
      nextPageLink: "",
      previousPageLink: "",
      page: 1,
      loading: false,
      searchResult: true,
      tags: [],
     suggestions: [
      { type: "firstName", value: "John", text: "firstName: John" },
      ],
      field: [{ value: 'firstName', label: 'firstName' }]
    
    }
  }
  handlePatientIdSearch = async (id) => {
    const patientData = await this.handleSpecificPatientSearch(id, 1);
    if (patientData){
      var p_data = null
      patientData.entry.forEach(e => {
        if (e.resource.resourceType == 'Patient'){
          p_data = e['resource']
        }
      });
      // const p_data = patientData['entry'][1]['resource']
      const name = this.getPatientName(p_data);
    
      const patient = {
        name: name,
        id: p_data.id,
        gender: p_data.gender,
        birthdate: p_data.birthDate,
      };
      this.setState({
        patients: [patient],
        loading: false,
        searchResult: true,
        previousPageLink: ""
      });
    }
    else{
      this.setState({
        patients: [],
        loading: false,
        searchResult: false,
        previousPageLink: ""
      });
    }
  }

  tagExists = (type) => {

     const tags_clean = this.state.tags.filter((tag, index) => tag.type !== type)
     this.setState({
      tags: tags_clean
     });
  }

  handleTagUpdates = (tags, type='add') => {
    for (let i = 0; i < tags.length; i++) {
      var tag = tags[i]
      if (type == 'del'){
        this.setState({searchPatientFirstName: ''})
        this.setState({searchPatientLastName: ''})
        this.setState({searchPatientID: ''})
        return
      }
      if (type == 'add'){
        this.tagExists(tag.type)
      }
      if (tag.type == 'id'){
        if (type=="del"){
          this.setState({searchPatientID: ''})
          return
        }
        
        this.setState({searchPatientID: tag.value})
        
        

      }
      else if (tag.type == 'firstName' || tag.type == 'lastName'){

        if (tag.type == 'firstName'){
          this.setState({searchPatientFirstName: tag.value})
        
        }
        else if (tag.type == 'lastName'){
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
  }

  handleAddition(tag) {
      tag.value = tag.text
      tag.text = this.state.field[0].value + ': ' + tag.text
      tag.type = this.state.field[0].value
      tag.id = tag.text
      
      this.setState(state => ({ tags: [...state.tags, tag] }));
      this.props.onInputChange([tag], 'add')
  }

  handleSearch = () => {
    if (this.state.searchPatientID){
      this.handlePatientIdSearch(this.state.searchPatientID)
    }
    else {
      this.handlePatientListSearch()
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
                  <h1 className="header-title" >Patient Data</h1>
                  <p >
                    A FHIR based service for retrieving patient data.
                  </p>
                  <a className="header-link" href="https://www.hl7.org/fhir/" target="_blank">About FHIR </a>
                  <i class="fas fa-fire-alt"></i>
                </div>
              </div>
              <TagSearch
                onInputChange={this.handleTagUpdates} 
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                tags={this.state.tags}
                field={this.state.field}
                handlePatientListSearch={this.handleSearch}
                />
              {/* <div id='searchbar'>
                    <Searchbox type='search' id="patientSearch-1" name="searchPatientFirstName" placeholder='First Name' onInputChange={this.handleSearchInputChange}/>
                <Searchbox type='search' id="patientSearch-2" name="searchPatientLastName" placeholder='Last Name' onInputChange={this.handleSearchInputChange}/>

                <button id='searchButton' title='Change displayed fields' className="vertical-center" onClick={this.handlePatientListSearch}>
                  <img src={searchIcon} alt='Search' id='searchIcon'/>
                  </button>
              </div> */}
              { this.state.loading
               ? <BeatLoader color="rgb(97, 208, 255)"></BeatLoader>
               : <div>
                  <CardList patients={this.state.patients} searchResult={this.state.searchResult} handlePatientSearch={this.handleSpecificPatientSearch}/>
                  <Navbuttons patientNum={this.state.patients.length} searchResult={this.state.searchResult} 
                    handleNext={this.handleNextPage} handlePrev={this.handlePrevPage} nextLink={this.state.nextPageLink} page={this.state.page}/>
                 </div>
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

  handleSearch = async () => {
    if (this.state.searchPatientID != ""){
      this.handlePatientIdSearch(this.state.searchPatientID)
    }
    else {
      this.handlePatientListSearch()
    }
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

    if (!patient.name || patient.name.length === 0) {
      return 'Unknown';
    }

    for (const name of patient.name) {
      cName = '';
      if (name.use === 'official') {
        let n = '';
        if (name.given) {
          n += name.given + ' ';
        } 

        if (name.family) {
          n += name.family;
        }

        return `${name.given} ${name.family}`; 
      }

      if (name.given) {
        cName += name.given + ' ';
      } 

      if (name.family) {
        cName += name.family;
      }
    }

    if (cName === '') {
      return 'Unknown';
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
    const res = await getPatientByID(id, count);
    
    if(res.status !== 200){
      if (res.status == 404){
        return null
      }
      console.error(`Error retrieving patients. Code ${res.status}`);
      return null;
    }
    

    return res.data
  }

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
    })
  }
}

export default App;
