import {Step} from 'semantic-ui-react';
import React, {Component} from 'react';
import {Input} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import axios from 'axios';

class Preference extends Component {
  constructor(){
    super()
    this.state = {
      cek : false,
      category: [
        {
          name : "Loading...",
          status : false
        }
      ],
      time : 0,
      name : '',
      userId : ''
    }
  }
  click(prefer){
    const changed = this.state.category.map(val => {
      if(val.status && val.name === prefer){
        val.status = false
      }else if(!val.status && val.name === prefer){
        val.status = true
      }
      return val;
    });
    this.setState({
      category : changed
    });
  }
  timing(time){
    this.setState({
      time : time.target.value
    });
  }
  submit(){
    const selected = this.state.category.filter(value => {
      return value.status === true
    });
    const filtered = selected.map(value => {
      return value.name.toLowerCase();
    });
    const preferences = {
      _id : this.state.userId,
      times : this.state.time,
      category : filtered
    }
    const {mutate} = this.props;
    mutate({variables : preferences}).then(({data}) => {
      // Jika Update Berhasil
      if(data.updateUser.n === 1){
        const userData = JSON.parse(localStorage.getItem('repodId'));
        const edited = {...userData,
          times : this.state.time,
          name : this.state.name,
          preferences : filtered
        };
        localStorage.setItem('repodId',JSON.stringify(edited));
      }
    }).catch(err => {
      // Jika Update Gagal
      console.log(err);
    });
  }
  componentWillMount(){
    axios.get(`${this.props.config.expressApi}/category/all`).then(({data}) => {
      let arrCategories = [];
      for(let i = 0; i < data.length;i++){
        const obj = {
          name : data[i].name,
          status : false
        }
        arrCategories.push(obj);
      }
      this.setState({
        category : arrCategories
      },() => this.parseSelected());
    }).catch(err => {
      console.log(err);
    });
    const storage = localStorage.getItem('repodId');
    if(storage){
      const userData = JSON.parse(storage);
      this.setState({
        userId : userData._id
      });
    }else{
      this.props.history.push('/login');
    }
  }
  parseSelected(){
    const userData = JSON.parse(localStorage.getItem('repodId'));
    const category = this.state.category.map(item => {
      for(let i = 0; i < userData.preferences.length; i++){
        const edited = userData.preferences[i][0].toUpperCase()+userData.preferences[i].slice(1);
        if(item.name === edited){
          item.status = true;
        }
      }
      return item;
    });
    this.setState({
      name : userData.name,
      time : userData.times,
      category : category
    });
  }
  render(){
    return (
      <div className="container">
        <div className="selection">
          {this.state.category.map((prefer, i) =>(
            <Step.Group ordered={prefer.status} key={i} style={{margin: 10, backgroundColor: '#4DB6AC'}}>
              <Step completed onClick={ () => this.click(prefer.name) }>
                <Step.Content >
                  <Step.Title >{prefer.name}</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          ))}
          <div className="footer">
            <div className="footer-container">
              <Input
                action={{content:'Next',  icon:'right arrow', labelPosition:'right', onClick:() => this.submit()  }}
                placeholder='Search...'
                label={{ icon: 'asterisk' }}
                labelPosition='left corner'
                onChange={(time) => this.timing(time)}
                type='number'
                value={this.state.time}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const savePreferences = gql`
  mutation
    preferences(
      $_id: String!,
      $category: [String!],
      $times: Int!
    ){
      updateUser(
      input: {
        _id: $_id,
        preferences: $category,
        times: $times
      }
    ){
      n
      nModified
      ok
    }}
`

const mapStateToProps = (state) => {
  return{
    config : state.configReducer
  }
}

export default withRouter(connect(mapStateToProps,null)(graphql(savePreferences)(Preference)));
