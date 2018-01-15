import './App.css'
import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import firebaseui from 'firebaseui'
import * as firebase from 'firebase'
import store from './redux'
import Login from './login'
import Home from './home'
import NavBar from './NavBar.js'
import DetailArticle from './home/detailArticle'
import Preference from './home/preference'
import User from './user'
import Sumary from './sumary'
import EditUser from './user/editUser'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import { HttpLink } from 'apollo-link-http'
import { Provider } from 'react-redux'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { setLoginStatus } from './redux/actions/actionConfig'
import { initializeIcons } from '@uifabric/icons'
import { BrowserRouter as Router, Route } from 'react-router-dom'

initializeIcons(undefined, { disableWarnings: true })

const client = new ApolloClient({
  link: new HttpLink({
    uri: store.getState().configReducer.graphqlApi
  }),
  cache: new InMemoryCache()
})

class App extends Component {
  constructor(){
    super()
    this.state = {
      ui : '',
      showMenu: store.getState().configReducer.loginStatus
    }
    store.subscribe(() => {
      this.setState({
        showMenu : store.getState().configReducer.loginStatus,
        update : Math.random()
      })
    })
  }
  setupFirebase(){
    const config = {
      apiKey: "AIzaSyCrLu7tBIy6bqtYq4OWEpmHAfPFaWW0Z3c",
      authDomain: "final-project-miracle.firebaseapp.com",
      databaseURL: "https://final-project-miracle.firebaseio.com",
      projectId: "final-project-miracle",
      storageBucket: "final-project-miracle.appspot.com",
      messagingSenderId: "517907313039"
    }
    firebase.initializeApp(config)
    this.setState({
      ui : new firebaseui.auth.AuthUI(firebase.auth())
    })
  }
  componentWillMount(){
    this.setupFirebase()
    const storage = localStorage.getItem('repodId')
    if(storage){
      store.dispatch(setLoginStatus(true))
    }
  }
  render(){
    return(
      <Router>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Fabric className="App">
              {store.getState().configReducer.loginStatus ? <NavBar/> : null}
              <div className="body">
                <div className="content">
                  <Route exact path="/" component={ Home }/>
                  <Route path="/about" component={ DetailArticle }/>
                  <Route path="/preference" component={ Preference }/>
                  <Route path="/user" component={ User }/>
                  <Route path="/edituser" component={ EditUser }/>
                  <Route path="/sumary" component={ Sumary }/>
                  <Route exact path='/article/detail/:id' component={ DetailArticle }/>
                  <Route path="/login" render={() => <Login ui={this.state.ui}/>} />
                </div>
              </div>
            </Fabric>
          </ApolloProvider>
        </Provider>
      </Router>
    )
  }
}

export default App
