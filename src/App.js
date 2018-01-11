import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import * as firebase from 'firebase';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

import store from './redux';
import Home from './components/Home';
import Login from './components/Login';

const client = new ApolloClient({
  link : new HttpLink({
    uri : 'http://localhost:3000/graphql'
  }),
  cache : new InMemoryCache()
});

class App extends Component {
  setupFirebase(){
    const config = {
      apiKey: "AIzaSyCrLu7tBIy6bqtYq4OWEpmHAfPFaWW0Z3c",
      authDomain: "final-project-miracle.firebaseapp.com",
      databaseURL: "https://final-project-miracle.firebaseio.com",
      projectId: "final-project-miracle",
      storageBucket: "final-project-miracle.appspot.com",
      messagingSenderId: "517907313039"
    };
    firebase.initializeApp(config);
  }
  componentWillMount(){
    this.setupFirebase();
  }
  render(){
    return(
      <Router>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <div>
              <Route exact path="/" render={() => <Home/>}/>
              <Route path="/login" render={() => <Login/>}/>
            </div>
          </ApolloProvider>
        </Provider>
      </Router>
    )
  }
}

export default App
