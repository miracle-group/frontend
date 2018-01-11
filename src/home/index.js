import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { match } = this.props
    let good = 'imaginasi'
    return (
      <div>
        <h2>Home</h2>
        <ul>
          <li>
            <Link to={`article/${good}`}>
              Rendering with React
            </Link>
          </li>
        </ul>
          <h3>Please select a topic.</h3>
      </div>
    )
  }
}