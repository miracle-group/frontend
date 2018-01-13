import React, {Component} from 'react'
import * as firebase from 'firebase'
import { graphql } from 'react-apollo';
import {withRouter} from 'react-router-dom';
import gql from 'graphql-tag';
import logoName from '../assets/img/logoRP.png'
import {connect} from 'react-redux';
import logo from '../assets/img/logo.png'
import { Image } from 'semantic-ui-react'

class Login extends Component {
  firebaseUI(){
    const uiConfig = {
      signInSuccessUrl: '/login',
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
      this.props.history.push('/');
    }else{
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          let objUser = {
            name: user.displayName,
            email: user.email,
            validation: user.uid
          }
          const {mutate} = this.props
          mutate({variables: objUser}).then(({data}) => {
            localStorage.setItem('repodId',JSON.stringify(data.userAdd));
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
    this.firebaseUI();
  }
  componentWillMount(){
    this.checkLogin();
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
      $validation: String!
    ){
    userAdd (
      input: {
        name: $name,
        email: $email,
        validation: $validation
      }
    ){
      _id
      name
      email
      validation
      times
      preferences
    }
  }
`

export default withRouter(connect(null,null)(graphql(checkLogin)(Login)));
