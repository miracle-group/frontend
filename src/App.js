import React, { Component } from 'react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import {Fabric} from 'office-ui-fabric-react/lib/Fabric'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './home'
import NavBar from './NavBar.js'
import { initializeIcons } from '@uifabric/icons';
import DetailArticle from './home/detailArticle'
import Preference from './home/preference'
initializeIcons(undefined, { disableWarnings: true });
const About = () => (
  <div>
    <h2>About</h2>
  </div>
)
class App extends Component {
  render() {
    return (
      <Router>
        <Fabric className="App">
          <div className="header">
            <NavBar/>      
            <ul style={{paddingTop:'50px'}}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/preference">Prefer</Link></li>
            </ul>
            <hr/>
          </div>
          <div className="body">
            <div className="content">
              <Route exact path="/" component={ Home }/>
              <Route path="/about" component={ About }/>
              <Route path="/preference" component={ Preference }/>
              <Route exact path='/article/:id' component={ DetailArticle }/>
            </div>
          </div>
        </Fabric>
      </Router>
    )
  }
}

export default App
