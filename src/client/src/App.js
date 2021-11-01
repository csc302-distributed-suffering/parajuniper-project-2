import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import editIcon from './icons/edit.png';
import { CardList } from './components/cardlist/cardlist';
import { Searchbox } from './components/searchbox/searchbox';

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
      patients: this.patientlist
    }
  }

  render(){
      return (
        <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (
            <div className="App">
              <div id='searchbar'>
                <Searchbox type='search' placeholder='What are you looking for today?'/>
                <button id='editButton' title='Change displayed fields' className="vertical-center">
                  <img src={editIcon} alt='Edit' id='editIcon'/>
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
}

export default App;
