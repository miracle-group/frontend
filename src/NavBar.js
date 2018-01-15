import React from 'react'
import {Image} from 'semantic-ui-react'
import Icon from 'react-icons-kit';
import { home } from 'react-icons-kit/entypo/home';
import { cog } from 'react-icons-kit/entypo/cog';
import { out } from 'react-icons-kit/entypo/out';
import {Link, withRouter} from 'react-router-dom';
import logo from './assets/img/logo.svg'
import * as firebase from 'firebase'
import {scaleRotate as Menu} from 'react-burger-menu';

class NavBar extends React.Component {
  logout(){
    firebase.auth().signOut().then(function(){
      localStorage.removeItem('repodId');
    }).catch(err => {
      console.log(err);
    });
  }
  render(){
    return(
      <Menu className="bm-menu bm-cross" style={{ overflow: 'hidden'}}>
        <Image src={logo} size='small' />
        <Link className="bm-item-list" to="/">
          <Icon size={23} icon={home}/> Home
        </Link>
        <Link className="bm-item-list" to="/user">
          <Icon size={23} icon={cog}/> Setting
        </Link>
        <Link className="bm-item-list" to="/login" onMouseUp={() => this.logout()}>
          <Icon size={23} icon={out}/> Logout
        </Link>
      </Menu>
    )
  }
}

export default withRouter(NavBar);
