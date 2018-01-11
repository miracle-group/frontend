import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './home'
import DetailArticle from './home/detailArticle'
const About = () => (
  <div>
    <h2>About</h2>
  </div>
)
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <hr/>
          <Route exact path="/" component={ Home }/>
          <Route path="/about" component={ About }/>
          <Route exact path='/article/:id' component={ DetailArticle }/>
        </div>
      </Router>
    )
  }
}

export default App
