import { Step } from 'semantic-ui-react'
import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'
const category = ['a', 'b', 'sadsdc', 'd', 'e', 'fasdsa' ,'gsad' , 'h', 'i','aasfas ', 'b', 'c', 'd', 'e', 'f' ,'g' , 'h', 'i','a', 'b', 'c', 'd', 'e', 'f' ,'g' , 'h', 'i','a', 'b', 'c', 'd', 'e', 'f' ,'g' , 'h', 'i']

class Preference extends Component {
  constructor(){
    super()
    this.state = {
      cek : false,
      category: []
    }
  }
  click = (prefer) => {
    if(this.state.cek) {
      this.setState({
        cek: false
      })
    } else {
      this.setState({
        cek: true
      })
    }
    alert('Your choise '+ prefer +' but ot yet')
    
  }
  render() {
    let { cek } = this.state
    return (
      <div className="container">
        <div className="selection">
          {category.map((prefer, i) =>(
            <Step.Group ordered={cek} key={i} style={{margin: 10, backgroundColor: '#4DB6AC'}}>
              <Step completed>
                <Step.Content>
                  <Step.Title onClick={ () => this.click(prefer) }>{prefer}</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          ))}
          <div className="footer">
            <div className="footer-container">
              <Input 
                action={{content:'Next',  icon:'right arrow', labelPosition:'right'  }} 
                placeholder='Search...' 
                label={{ icon: 'asterisk' }}
                labelPosition='left corner'
              />
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

export default Preference
