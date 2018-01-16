import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image as img, Input, Button, Label } from 'semantic-ui-react'

class User extends Component {
  constructor () {
    super()
    this.state = {
      user : null, 
      preferences: null
    }
  }

  componentWillMount () {
    const storage = localStorage.getItem('repodId')
    const preferences = localStorage.getItem('repodIdCategories')
    if(storage) {
      this.setState({
        user: storage,
        preferences: preferences
      })
    }
  }

  render() {
    const user = JSON.parse(this.state.user)
    const preferences = JSON.parse(this.state.preferences)
    let tags = null
    if(user){
      tags =
      preferences.map((tag, i) => {
        return (
          <Label style={{margin: '5px'}} key={i} as='a' color='teal' tag>{ tag.name }</Label>
        )
      })
    }
    return (
      <div className="container" style={{padding: '10px', textAlign: 'center', paddingTop:'10px'}}>
        <div className="selection" style={{padding: '10px', textAlign: 'center', paddingTop:'50px', marginTop: '10px'}}>
          <Card.Content style={{padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
            <Card.Header style={{ padding: '10px'}}>
            <h3>Hallo, { user && user.name }</h3>
            <img size='small' className="photoprofil" alt='profile' src={ user && user.profileImage} />
            </Card.Header>
            <Card.Meta style={{ padding: '10px', textAlign: 'center'}}>
            </Card.Meta>
            <Card.Description style={{ width: '300px', padding: '10px', textAlign: 'center', margin: 'auto'}}>
              <div style={{width: '300px', textAlign: 'center'}}>
                { tags }
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
