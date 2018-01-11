import React from 'react'
import { Card, Icon, Image, Input, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const User = () => (
  <div className="container">
    <div className="selection">
      <Link to="/edituser">
        <Button 
          floated='right'>
          Edit profile
        </Button>
      </Link>
      <Card.Content>
        <Card.Header>
        <h3>Matthew</h3>
        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            Joined in 2015
          </span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          22 Friends
        </a>
      </Card.Content> 
      <Input 
        action='Save' 
        placeholder='Cange time' />
    </div>
  </div>
)
export default User