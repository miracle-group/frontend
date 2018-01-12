import React from 'react'
// import {menuItems as defaultMenuItems, farMenuItems as defaultFarMenuItems} from './items.js'
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from './assets/img/logo.svg'
import * as firebase from 'firebase'

class NavBar extends React.Component {
  logout () {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('====================================')
      console.log('KELUAR')
      console.log('====================================')
    }).catch(function(error) {
      // An error happened.
    });
  }
  render(){
    return (
      <div className="NavBar kecils">
        <Image src={logo} size='small' />
        <nav>
          <ul>
            <li><a>User</a>
            <ul>
              <li><Link to="/user">Setting</Link></li>
              <li><a onClick={() => this.logout()}>Logout</a></li>
            </ul>        
            </li>
          </ul>
      </nav>
      </div>
    )
  }
}

export default NavBar
