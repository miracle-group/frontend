import React from 'react'
import { Card, Input, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class EditUser extends React.Component {
  render(){
    return (
      <div className="container" style={{padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
        <div className="selection" style={{padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
          <Card.Content style={{padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
            <Card.Header style={{ padding: '10px'}}>
            <h3>Hallo, Matthew</h3>
            <img className="photoprofil" alt='profile logo' src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
            </Card.Header>
            <Card.Meta style={{ padding: '10px', textAlign: 'center'}}>
              <span className='date'>
                <Input value='Joined in 2015' />
              </span>
            </Card.Meta>
            <Card.Description style={{ padding: '10px'}}>
              <Input value='Matthew is a musician living in Nashville.' />  
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
   
          </Card.Content> 
          <div style={{padding: '20px'}}>
            <Button.Group>
              <Link to="/user">
                <Button>Cancel</Button>
              </Link>
              <Button.Or />
              <Button positive>Save</Button>
            </Button.Group>
          </div>
        </div>
      </div>
    )
  }
}
export default EditUser