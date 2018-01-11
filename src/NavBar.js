import React from 'react'
// import {menuItems as defaultMenuItems, farMenuItems as defaultFarMenuItems} from './items.js'
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from './assets/img/logo.svg'

class NavBar extends React.Component {
  render(){
    return (
      <div className="NavBar">
        <Image src={logo} size='small' />
        <nav>
          <ul>
            <li><a>User</a> 
            <ul>
              <li><Link to="/user">Setting</Link></li>
              <li><Link to="#">Logout</Link></li>
            </ul>        
            </li>
          </ul>
      </nav>
      </div>
    )
  }
}

export default NavBar
