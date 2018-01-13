import {withRouter} from 'react-router-dom';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import React, { Component } from 'react'
import { Input, Image, Step } from 'semantic-ui-react';
import Icon from 'react-icons-kit';
import { checkmarkRound } from 'react-icons-kit/ionicons/checkmarkRound'
import { arrowRightThin } from 'react-icons-kit/metrize/arrowRightThin'
import { arrowLeftThin } from 'react-icons-kit/metrize/arrowLeftThin';
import gql from 'graphql-tag'
import logo from '../assets/img/logoblack.png'
import axios from 'axios';

class Preference extends Component {
  constructor(){
    super()
    this.state = {
      cek : false,
      prefer: true,
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
  click = (prefer) => {
    const changed = this.state.category.map(val => {
      if(val.status && val.name === prefer){
        val.status = false
      }else if(!val.status && val.name === prefer){
        val.status = true
      }
      return val
    })
    this.setState({
      category : changed
    })
  }
  timing(time){
    this.setState({
      time : time.target.value
    })
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
        this.props.history.push('/');
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
  render() {
    let image = 'https://www.hurstonwright.org/wp-content/uploads/2015/04/book-pages-med11.jpg'
    let time = null
    if(this.state.prefer) {
      time = <div>
        { this.state.prefer && this.state.category.map((prefer, i) =>(
          <Step.Group key={i} style={{margin: 10, backgroundColor: '#4DB6AC'}}>
            <Step completed onClick={ () => this.click(prefer.name) }>
              <Step.Content>
                <Step.Title> {prefer.status ? <Icon icon={checkmarkRound} /> : null} {prefer.name}</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        ))}
        <div style={{position : "fixed", width : "60px", bottom : "5%", margin : "auto", left : 0, right : 0}}>
          <Icon size={60} icon={arrowRightThin} onClick={ () => this.setState({prefer: false})}/>
        </div>

      </div>
    } else {
     time =
      <div className="container-contact100" >
        <div
          style = {{
            position : "relative",
            margin : "auto",
            textAlign: 'center',
            padding:0
          }}>
          <span className="contact100-form-title">
            Set Your Time
          </span>
          <Input
            size='large'
            label={{ tag: true, content: 'Minutes' }}
            labelPosition='right'
            placeholder='Enter time'
          />
        </div>
        <div style={{position : "fixed", width : "140px", bottom : "5%", margin : "auto", left : 0, right : 0 , flexDirection:'row'}}>
          <Icon size={60} icon={arrowLeftThin} onClick={ () => this.setState({prefer: true})}/>
          <div style={{width : "60px", height : "60px", display : "inline-flex", marginLeft:'10px'}}>
            <Image
              src={logo}
              centered
              size='small'
              className='logoColor'
              onClick={ () => this.submit()}
            />
          </div>
        </div>
      </div>
    }
    return (
      <div className="container">
        <div className="selections">
          {time}
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
