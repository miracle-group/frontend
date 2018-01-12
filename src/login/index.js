import React, {Component} from 'react'
import * as firebase from 'firebase'
import firebaseui from 'firebaseui'
import { graphql } from "react-apollo"
import gql from 'graphql-tag'
import  { Redirect } from 'react-router-dom'
import logo from '../assets/img/logo.svg'
import { Image } from 'semantic-ui-react'

class Login extends Component {
  firebaseUI(){
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    console.log('====================================')
    console.log(this.props, 'INI DATA PROPS')
    console.log('====================================')
    const uiConfig = {
      signInSuccessUrl: '/preference',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ]
    }
    
    ui.start('#firebaseui-auth-container',uiConfig)
  }
  checkLogin = async() => {
    firebase.auth().onAuthStateChanged(async(user) => {
      if (user) {
        console.log('====================================')
        console.log(user)
        console.log('====================================')
        let objUser = {
          name: user.displayName,
          email: user.email,
          validation: user.uid
        }
        const { mutate } = this.props
        const wait = await mutate({ variables: objUser })
        .then(({data}) => {
          console.log('====================================')
          console.log('MASUK', data)
          console.log('====================================')
          return <Redirect to='/preference'/>
        })
        .catch( err => {
          console.log('====================================')
          console.log('WHY ERROR', err)
          console.log('====================================')
        })
    
      }
    })
  }
  componentDidMount(){
    this.firebaseUI()
    this.checkLogin()
  }
  render(){
    return(
      <div className="login-container">
        <div className="login-header">
          <Image 
            src={logo}
            centered
            size='medium'
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
    }
  }
`
export default graphql(checkLogin)(Login)
