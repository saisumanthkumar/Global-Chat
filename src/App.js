import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './components/Home';
import Global from './components/Global';
import './App.css'

function App() {
  return (
    <>
      <div className="bgblur"></div>

      <Router>
        <Route path='/Global-Chat/' exact component={Home} />
        <Route path='/global'  component={Global} />
      </Router>
    </>
  );
}

export default App;
