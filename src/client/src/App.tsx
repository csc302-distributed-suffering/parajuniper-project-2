import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component{
  render(){
      return (
        <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (
            <div className="App">
              <header className="App-header">
                <p>
                  Why, if it isn't a running React app! A truly fine sight indeed.
                </p>
                <button onClick={() => {
                  fetch('/demo/demoRoute')
                    .then(res => res.json())
                    .then(json => document.getElementById("hiddenDiv")!.textContent = json.text)
                }}>Click Me, I dare you! ;)</button>
                <div id="hiddenDiv"></div>
              </header>
            </div>
            )}
          />          
        </Switch>
      </BrowserRouter>
      );
      
  }
}

export default App;
