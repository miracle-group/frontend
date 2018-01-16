import React, { Component } from 'react'
import { Card, Image as img, Input, Button, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class User extends Component {
  constructor () {
    super()
    this.state = {
      user : null,
      categoies : []
    }
  }

  componentWillMount () {
    const storage = localStorage.getItem('repodId');
    const categoies = JSON.parse(localStorage.getItem('repodIdCategories'));
    if(storage) {
      this.setState({
        user : storage,
        categoies : categoies
      });
    }
  }
  updateUserCategory(){
    this.setState({
      update : Math.random()
    });
  }
  render(){
    const user = JSON.parse(this.state.user);
    let tag = null
    if(user){
      tag = this.state.categoies.map((category,i) => {
        const edited = category.name[0].toUpperCase()+category.name.slice(1);
        return(
          <Label style={{margin: '5px'}} key={i} as='a' color='teal' tag>{edited}</Label>
        )
      });
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
                { tag }
              </div>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div style={{ padding: '20px' }}>
              <Link to={{ pathname: `/edituser`, query : {user}, updateCategory : () => this.updateUserCategory()}}>
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
