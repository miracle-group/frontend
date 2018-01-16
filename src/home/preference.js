import React, { Component } from 'react'
import Icon from 'react-icons-kit'
import gql from 'graphql-tag'
import logo from '../assets/img/logoblack.png'
import axios from 'axios'
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { Input, Image, Label } from 'semantic-ui-react'
import { BounceLoader } from 'react-spinners'
import { buttonQuestion } from 'react-icons-kit/metrize/buttonQuestion'
import { checkmarkRound } from 'react-icons-kit/ionicons/checkmarkRound'
import { arrowRightThin } from 'react-icons-kit/metrize/arrowRightThin'
import { arrowLeftThin } from 'react-icons-kit/metrize/arrowLeftThin';

import {setPosts,setLoading} from '../redux/actions/actionPost';

class Preference extends Component {
  constructor(){
    super()
    this.state = {
      cek : false,
      prefer: true,
      category: null,
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
    })
    const filtered = selected.map(value => {
      return {
        name : value.name.toLowerCase(),
        value : 0
      }
    })
    const preferences = {
      _id : this.state.userId,
      times : this.state.time,
      category : filtered,
      api : this.props.config.expressApi
    }
    const {mutate} = this.props
    mutate({variables : preferences}).then(({data}) => {
      // Jika Update Berhasil
      if(data.updateUser.n === 1){
        const userData = JSON.parse(localStorage.getItem('repodId'))
        const edited = {...userData,
          times : this.state.time,
          name : this.state.name,
          preferences : filtered
        }
        localStorage.setItem('repodId',JSON.stringify(edited))
        this.props.history.push('/')
      }
    }).catch(err => {
      // Jika Update Gagal
      console.log(err)
    });
  }
  componentWillMount(){
    axios.get(`${this.props.config.expressApi}/category/all`).then(({data}) => {
      let arrCategories = []
      for(let i = 0; i < data.length; i++){
        const obj = {
          name : data[i].name,
          status : false
        }
        arrCategories.push(obj)
      }
      this.setState({
        category : arrCategories
      },() => this.parseSelected())
    }).catch(err => {
      console.log(err)
    })
    const storage = localStorage.getItem('repodId')
    if(storage) {
      const userData = JSON.parse(storage)
      this.setState({
        userId : userData._id
      })
    } else {
      this.props.history.push('/login')
    }
  }
  parseSelected(){
    const userData = JSON.parse(localStorage.getItem('repodId'))
    const category = this.state.category.map(item => {
      for(let i = 0; i < userData.preferences.length; i++){
        const edited = userData.preferences[i].name[0].toUpperCase()+userData.preferences[i].name.slice(1);
        if(item.name === edited){
          item.status = true
        }
      }
      return item
    })
    this.setState({
      name : userData.name,
      time : userData.times,
      category : category
    })
  }
  render() {
    let time = null
    if(this.state.prefer) {
      if(!this.state.category) {
        time =
          <div
            style = {{
              position : "relative",
              margin : "auto",
              textAlign: 'center',
              paddingTop: '25%',
              paddingBottom: '25%',
              width: '50%',
            }}>
            <div
              className='sweet-loading'
              style={{
                display: 'inline-block'
              }}>
              <BounceLoader
                color={'#4DB6AC'}
                loading={true}
              />
            </div>
            <h3 style={{textAlign: 'center', margin : "auto",}}>Loading preferences...</h3>
          </div>
      } else {
        time =
          <div
            style={{
              paddingTop:'80px',
              paddingLeft: '30px',
              paddingBottom: '80px'
            }}>
            { this.state.prefer && this.state.category.map((prefer, i) =>(
              <Label
                key={i}
                as='a'
                color={
                  prefer.status ?
                  'teal' : null
                }
                image
                onClick={ () => this.click(prefer.name) }
                style={{
                  margin: '10px',
                  padding: '15px',
                  fontSize: '20px'
                }}
                >
                { prefer.name  }
                  { prefer.status ?
                    <Icon style={{paddingLeft: '5px'}} size={10} icon={checkmarkRound} /> : null
                  }
              </Label>
            ))}
            <div
              style={{
                position : "fixed",
                width : "60px",
                bottom : "5%",
                margin : "auto",
                left : 0,
                right : 0
              }}>
              <Icon
                size={60}
                icon={arrowRightThin}
                onClick={ () => this.setState({prefer: false})}
              />
            </div>
          </div>
      }
    } else {
     time =
      <div>
        <div
          style = {{
            position : "fixed",
            margin : "auto",
            textAlign: 'center',
            top: '45%',
            bottom: '25%',
            width: '200px',
            left : 0,
            right : 0 ,
          }}>
          <span>
            <span
              data-tip="This is info for everithing you want to do. So, do it... bos" >
            <Icon
                style={{
                  color: '#4DB6AC'
                }}
                size={50}
                icon={buttonQuestion}
              />
            </span>
            <br/>
            <br/>
            <ReactTooltip
              place="top"
              type="dark"
              effect="float"
            />
          </span>
          <Input
            fluid
            size='large'
            placeholder='Reading time preferences...'
            value={this.state.time}
            onChange={(time) => this.timing(time)}
            />
        </div>
        <div
          style={{
            position : "fixed",
            width : "140px",
            bottom : "5%",
            margin : "auto",
            left : 0,
            right : 0 ,
            flexDirection:'row'
          }}>
          <Icon
            size={60}
            icon={arrowLeftThin}
            onClick={ () => this.setState({prefer: true})}
          />
          <div
            style={{
              width : "60px",
              height : "60px",
              display : "inline-flex",
              marginLeft:'10px'
            }}>
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
      <div
        className="container">
        <div
          className="selections">
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
      $category: [Preferences!]!,
      $times: Int!,
      $api : String!
    ){
      updateUser(
      input: {
        _id: $_id,
        preferences: $category,
        times: $times,
        api: $api
      }
    ){
      n
      nModified
      ok
    }}
`

const mapStateToProps = (state) => {
  return {
    config : state.configReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPosts : (posts) => dispatch(setPosts(posts)),
    setLoading : (status) => dispatch(setLoading(status))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(graphql(savePreferences)(Preference)));
