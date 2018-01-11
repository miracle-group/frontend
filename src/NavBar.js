import React from 'react'
// import {menuItems as defaultMenuItems, farMenuItems as defaultFarMenuItems} from './items.js'
import { Button, Dropdown, Menu } from 'semantic-ui-react'

class NavBar extends React.Component {
  constructor(){
    super()
  }
  render(){
    return (
      <div className="NavBar">
        <div className="logo ms-font-xl">
          <strong>Tes App</strong>
        </div>
        <nav>
          <ul>
            <li><a href="#">User</a>
            
            <ul>
                <li><a href="#">Setting</a></li>
                <li><a href="#">Logout</a></li>
            </ul>        
            </li>
          </ul>
      </nav>
      </div>
    )
  }
}

export default NavBar
