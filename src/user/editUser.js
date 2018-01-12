import React from 'react'
import { Card, Icon, Image, Input, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class EditUser extends React.Component {
  render(){
    return (
      <div className="container">
        <div className="selection">
          <Card.Content>
            <Card.Header>
              <h3>Matthew</h3>
              <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
            </Card.Header>
            <br/>
            <Card.Meta>
              <span className='date'>
                <Input value='Joined in 2015' />
              </span>
            </Card.Meta>
            <br/>
            <Card.Description>
              <Input value='Matthew is a musician living in Nashville.' />          
            </Card.Description>
          </Card.Content>
          <br/>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
          </Card.Content> 
          <Button.Group>
            <Link to="/user">
              <Button>Cancel</Button>
            </Link>
            <Button.Or />
            <Button positive>Save</Button>
          </Button.Group>
        </div>
      </div>
    )
  }
}
export default EditUser