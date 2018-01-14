import React from 'react'
import Icon from 'react-icons-kit'
import logo from './assets/img/logo.svg'
import * as firebase from 'firebase'
import { home } from 'react-icons-kit/entypo/home'
import { cog } from 'react-icons-kit/entypo/cog'
import { out } from 'react-icons-kit/entypo/out'
import { Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { scaleRotate as Menu } from 'react-burger-menu'
import { setLoginStatus } from './redux/actions/actionConfig'
import { Link, withRouter } from 'react-router-dom'

class NavBar extends React.Component {
  logout(){
    firebase
    .auth()
    .signOut()
    .then(function(){
      localStorage.removeItem('repodId')
    }).catch(err => {
      console.log(err)
    })
  }

  render(){
    const { user } = this.props
    return(
      <Menu 
        className="bm-menu bm-cross" 
        style={{ 
          overflow: 'hidden'
        }}>
        <h2 style={{color: '#fff'}}>{user && user.name}</h2>
        <br/>
        <Link 
          className="bm-item-list" 
          to="/">
          <Icon 
            size={23} 
            icon={home}
          /> Home
        </Link>
        <Link 
          className="bm-item-list" 
          to="/user">
          <Icon 
            size={23} 
            icon={cog}
          /> Setting
        </Link>
        <Link 
          className="bm-item-list"
          to="/login"
          onClick={() => this.props.setLoginStatus(false)}
          onMouseUp={() => this.logout()}>
          <Icon 
            size={23} 
            icon={out}
          /> Logout
        </Link>
      </Menu>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus : (status) => dispatch(setLoginStatus(status))
  }
}

const mapStateToProps = (state) => {
  console.log('====================================')
  console.log(state)
  console.log('====================================')
  return {
    user : state.configReducer.user
  }
}

export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(NavBar))
