import React, { Component } from 'react'
import { Card, Image as img, Input, Button, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class User extends Component {
  constructor () {
    super()
    this.state = {
      user : null
    }
  }
  
  componentWillMount () {
    const storage = localStorage.getItem('repodId')
    if(storage) {
      this.setState({
        user: storage
      })
    }
  }

  render() {
    const user = JSON.parse(this.state.user)
    let tag = null
    if(user){
      function formatDate(date) {
        let monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ]
      
        if(date) {
          let day = date.getDate()
          let monthIndex = date.getMonth()
          let year = date.getFullYear()
          return day + ' ' + monthNames[monthIndex] + ' ' + year
        }        
      }
      user.date = formatDate(user.createdAt)
      tag = 
      user.preferences.map((tag, i) => <Label style={{margin: '5px'}} key={i} as='a' color='teal' tag>{ tag }</Label>)
    }
    
    return (
      <div className="container" style={{padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
        <div className="selection" style={{padding: '10px', textAlign: 'center', paddingTop:'50px', marginTop: '10px'}}>
          <Card.Content style={{padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
            <Card.Header style={{ padding: '10px'}}>
            <h3>Hallo, { user && user.name }</h3>
            <img className="photoprofil" size='small' alt='profile' src={ user && user.profileImage} />
            </Card.Header>
            <Card.Meta style={{ padding: '10px', textAlign: 'center'}}>
              <span className='date'>
                Joined in { user && user.date }
              </span>
            </Card.Meta>
            <Card.Description style={{ width: '300px', padding: '10px', textAlign: 'center', margin: 'auto'}}>
              <div style={{width: '300px', textAlign: 'center'}}>
                { tag }
              </div>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div style={{ padding: '20px' }}>
              <Link to={{ pathname: `/edituser`, query: { user } }}>
                <Button>
                  Edit preferences
                </Button>
              </Link>
            </div>
          </Card.Content> 
          
        </div>
      </div>
    )
  }
}

export default User