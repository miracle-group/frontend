import { Step } from 'semantic-ui-react'
import React, { Component } from 'react'
import { Input, Button, Image } from 'semantic-ui-react'
import { log } from 'util'
import Icon from 'react-icons-kit'
import { check } from 'react-icons-kit/entypo/check'  
import { checkmark } from 'react-icons-kit/icomoon/checkmark' 
import { checkmarkRound } from 'react-icons-kit/ionicons/checkmarkRound'  
import { arrowRightThin } from 'react-icons-kit/metrize/arrowRightThin'  
import { arrowLeftThin } from 'react-icons-kit/metrize/arrowLeftThin';  
import { graphql } from "react-apollo"
import gql from 'graphql-tag'
import logo from '../assets/img/logoblack.png'
const category = ['a', 'b', 'sadsdc', 'd', 'e', 'fasdsa' ,'gsad' , 'h', 'i','aasfas ', 'b', 'c', 'd', 'e', 'f' ,'g' , 'h', 'i','a', 'b', 'c', 'd', 'e', 'f' ,'g' , 'h', 'i','a', 'b', 'c', 'd', 'e', 'f' ,'g' , 'h', 'i']

class Preference extends Component {
  constructor(){
    super()
    this.state = {
      cek : false,
      prefer: true,
      category: [
        {
          name : "Tech",
          status : false
        },
        {
          name : "Health",
          status : false
        }
      ],
      time : 0
    }
  }
  componentWillMount () {

  }
  click = (prefer) => {
    const changed = this.state.category.map(val => {
      if(val.status && val.name == prefer){
        val.status = false
      }else if(!val.status && val.name == prefer){
        val.status = true
      }
      return val
    })
    this.setState({
      category : changed
    })
  }
  timing = (time) => {
    this.setState({
      time : time.target.value
    })
  }
  submit = () => {
    const selected = this.state.category.filter(value => {
      return value.status == true
    })
    const filtered = selected.map(value => {
      return value.name.toLowerCase()
    })
    const preferences = {
      time : this.state.time,
      category : filtered
    }
    const { mutate } = this.props
    console.log('====================================')
    console.log(preferences)
    console.log('====================================')
  }
  render() {
    let { cek } = this.state
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
            padding:0, margin:0
            // height:'100px',
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
const setPreferences = gql`
  mutation 
    preferences (
      $category: String!,
      $time: String!
    ){
    addPreferences (
      input: { 
        category: $name,
        time: $email
      }
    ){
      _id
      name
      email
      validation
      time
      category
    }
  }
`
export default graphql(setPreferences)(Preference)
