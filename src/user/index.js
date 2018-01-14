import React from 'react'
import { Card, Image as img, Input, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const User = () => (
  <div className="container" style={{padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
    <div className="selection" style={{padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
      <Card.Content style={{padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
        <Card.Header style={{ padding: '10px'}}>
        <h3>Hallo, Matthew</h3>
        <img className="photoprofil" alt='profile' src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
        </Card.Header>
        <Card.Meta style={{ padding: '10px', textAlign: 'center'}}>
          <span className='date'>
            Joined in 2015
          </span>
        </Card.Meta>
        <Card.Description style={{ padding: '10px'}}>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Input 
          action='Save' 
          placeholder='Cange time' 
        />
      </Card.Content> 
      <div style={{padding: '20px'}}>
        <Link to="/edituser" >
          <Button>
            Edit profile
          </Button>
        </Link>
      </div>
    </div>
  </div>
)
export default User