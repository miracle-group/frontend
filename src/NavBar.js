import React from 'react'
import Icon from 'react-icons-kit'
import * as firebase from 'firebase'
import { cog } from 'react-icons-kit/entypo/cog'
import { out } from 'react-icons-kit/entypo/out'
import { home } from 'react-icons-kit/entypo/home'
import { inTime } from 'react-icons-kit/entypo/inTime'
import { Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { graph } from 'react-icons-kit/entypo/graph';
import { scaleRotate as Menu } from 'react-burger-menu'
import { setLoginStatus,setUserLogin } from './redux/actions/actionConfig'
import { Link, withRouter } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(){
    super()
    this.state = {
      user : null
    }
  }

  componentWillReceiveProps(nextProps){
    // debugger
    this.setState({
      user : nextProps.loggedinUser
    });
  }
  componentWillMount(){
    const storage = localStorage.getItem('repodId')
    // debugger
    if(storage) {
      const newstorage = JSON.parse(storage)
      this.setState({
        user: newstorage
      });
    }
  }

  logout(){
    firebase.auth().signOut().then(function(){
      localStorage.removeItem('repodIdCategories');
      localStorage.removeItem('repodId');
    }).catch(err => {
      console.log(err)
    });
  }

  render(){
    const { user } = this.state
    // debugger
    return(
      <Menu
        className="bm-menu bm-cross"
        style={{
          overflow: 'hidden'
        }}>
        <Image 
          style={{margin: 'auto'}} 
          src={user && user.profileImage} 
          size='small' 
          circular />
        <br/>
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
          to="/sumary">
          <Icon
            size={23}
            icon={graph}
          /> Sumary
        </Link>
        <Link
          className="bm-item-list"
          to="/history">
          <Icon
            size={23}
            icon={inTime}
          /> History
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

const mapStateToProps = (state) => {
  return {
    loggedinUser : state.configReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus : (status) => dispatch(setLoginStatus(status)),
    setUserLogin : (user) => dispatch(setUserLogin(user))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavBar));
