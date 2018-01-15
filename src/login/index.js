import React, { Component } from 'react'
import * as firebase from 'firebase'
import gql from 'graphql-tag'
import logo from '../assets/img/logo.png'
import logoName from '../assets/img/logoRP.png'
import { Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { setLoginStatus, setUserLogin } from '../redux/actions/actionConfig'

class Login extends Component {
  firebaseUI(){
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ]
    }
    this.props.ui.start('#firebaseui-auth-container',uiConfig)
  }
  checkLogin(){
    const storage = localStorage.getItem('repodId');
    if(storage){
      this.props.setLoginStatus(true)
      this.props.history.push('/');
    }else{
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          let objUser = {
            name: user.displayName,
            email: user.email,
            profileImage : user.photoURL,
            validation: user.uid
          }
          const {mutate} = this.props
          mutate({variables: objUser}).then(({data}) => {
            this.props.setLoginStatus(true)
            this.props.setUserLogin(data.userAdd)
            localStorage.setItem('repodId',JSON.stringify(data.userAdd))
            if(data.userAdd.times === 0 || data.userAdd.preferences.length === 0){
              this.props.history.push('/preference');
            }else if(data.userAdd.times !== 0 && data.userAdd.preferences.length > 0){
              this.props.history.push('/');
            }
          }).catch(err => {
            console.log(err);
          });
        }
      });
    }
  }
  componentDidMount(){
    this.firebaseUI()
  }
  componentWillMount(){
    this.checkLogin()
  }
  render(){
    return(
      <div className="login-container">
        <div className="login-header">
          <Image
            src={logo}
            centered
            size='small'
            className='logoColor'
          />
          <Image
            src={logoName}
            centered
            size='small'
            className='logoColor'
          />
        </div>
        <div id="firebaseui-auth-container"></div>
      </div>
    )
  }
}
const checkLogin = gql`
  mutation
    login (
      $name: String!,
      $email: String!,
      $profileImage : String!,
      $validation: String!
    ){
    userAdd (
      input: {
        name: $name,
        email: $email,
        profileImage : $profileImage,
        validation: $validation
      }
    ){
      _id
      name
      email
      profileImage
      validation
      times
      preferences
    }
  }
`

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus : (status) => dispatch(setLoginStatus(status)),
    setUserLogin : (user) => dispatch(setUserLogin(user))
  }
}

export default withRouter(connect(null,mapDispatchToProps)(graphql(checkLogin)(Login)));
