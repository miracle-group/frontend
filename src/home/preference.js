import { Step } from 'semantic-ui-react'
import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'
import { log } from 'util';
const category = ['a', 'b', 'sadsdc', 'd', 'e', 'fasdsa' ,'gsad' , 'h', 'i','aasfas ', 'b', 'c', 'd', 'e', 'f' ,'g' , 'h', 'i','a', 'b', 'c', 'd', 'e', 'f' ,'g' , 'h', 'i','a', 'b', 'c', 'd', 'e', 'f' ,'g' , 'h', 'i']

class Preference extends Component {
  constructor(){
    super()
    this.state = {
      cek : false,
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
  click = (prefer) => {
    const changed = this.state.category.map(val => {
      if(val.status && val.name == prefer){
        val.status = false
      }else if(!val.status && val.name == prefer){
        val.status = true
      }
      return val;
    });
    this.setState({
      category : changed
    });
  }
  timing = (time) => {
    this.setState({
      time : time.target.value
    });
  }
  submit = () => {
    const selected = this.state.category.filter(value => {
      return value.status == true
    });
    const filtered = selected.map(value => {
      return value.name.toLowerCase()
    });
    const preferences = {
      time : this.state.time,
      category : filtered
    }
    const { mutate } = this.props;
    console.log('====================================')
    console.log(preferences)
    console.log('====================================')
  }
  render() {
    let { cek } = this.state
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
              />
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

export default Preference
