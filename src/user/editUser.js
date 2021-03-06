import gql from 'graphql-tag'
import React from 'react'
import axios from 'axios'
import Icon from 'react-icons-kit'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { checkmarkRound } from 'react-icons-kit/ionicons/checkmarkRound'
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone'
import { Input, Label, Button, Card } from 'semantic-ui-react'

class EditUser extends React.Component {
  constructor(){
    super()
    this.state = {
      cek : false,
      prefer: true,
      category: null,
      time : 0,
      name : '',
      userId : ''
    }
  }
  click = (prefer) => {
    const changed = this.state.category.map(val => {
      if(val.status && val.name === prefer){
        val.status = false
      }else if(!val.status && val.name === prefer){
        val.status = true
      }
      return val
    })
    this.setState({
      category : changed
    })
  }
  timing(time){
    this.setState({
      time : time.target.value
    })
  }
  submit(){
    const selected = this.state.category.filter(value => {
      return value.status === true
    })
    const filtered = selected.map(value => {
      return {
        name : value.name.toLowerCase(),
        value : 5
      }
    });
    const preferences = {
      _id : this.state.userId,
      times : this.state.time,
      category : filtered,
      api : this.props.config.expressApi
    }
    const {mutate} = this.props
    mutate({variables : preferences}).then(({data}) => {
      // Jika Update Berhasil
      if(data.updateUser.n === 1){
        const userData = JSON.parse(localStorage.getItem('repodId'))
        const edited = {...userData,
          times : this.state.time,
          name : this.state.name
        }
        localStorage.setItem('repodId',JSON.stringify(edited))
        localStorage.setItem('repodIdCategories',JSON.stringify(filtered));
        this.props.location.updateCategory();
        this.props.history.push('/user');
      }
    }).catch(err => {
      // Jika Update Gagal
      console.log(err)
    });
  }
  componentWillMount(){
    axios.get(`${this.props.config.expressApi}/category/all`).then(({data}) => {
      let arrCategories = []
      for(let i = 0; i < data.length; i++){
        const obj = {
          name : data[i].name,
          status : false
        }
        arrCategories.push(obj)
      }
      this.setState({
        category : arrCategories
      },() => this.parseSelected())
    }).catch(err => {
      console.log(err)
    })
    const storage = localStorage.getItem('repodId')
    if(storage) {
      const userData = JSON.parse(storage)
      this.setState({
        userId : userData._id
      })
    } else {
      this.props.history.push('/login')
    }
  }
  parseSelected(){
    const userData = JSON.parse(localStorage.getItem('repodId'));
    const userCategories = JSON.parse(localStorage.getItem('repodIdCategories'))
    const category = this.state.category.map(item => {
      for(let i = 0; i < userCategories.length; i++){
        const edited = userCategories[i].name[0].toUpperCase()+userCategories[i].name.slice(1);
        if(item.name === edited){
          item.status = true
        }
      }
      return item
    });
    this.setState({
      name : userData.name,
      time : userData.times,
      category : category
    });
  }
  render(){
    const { user } = this.props.location.query
    let time = null
    if(!this.state.category) {
      time =
        <div
          style = {{
            position : "relative",
            margin : "auto",
            textAlign: 'center',
            paddingTop: '25%',
            paddingBottom: '25%',
            width: '60px',
          }}>
          <div className='sweet-loading'>
            <BounceLoader
              color={'#4DB6AC'}
              loading={true}
            />
          </div>
        </div>
    } else {
      time =
        <div
          style={{
            paddingTop:'5px',
            margin: '10px',
            paddingBottom: '80px'
          }}>
          { this.state.prefer && this.state.category.map((prefer, i) =>(
            <Label
              key={i}
              as='a'
              color={
                prefer.status ?
                'teal' : null
              }
              image
              onClick={ () => this.click(prefer.name) }
              style={{
                margin: '10px',
                padding: '15px'
              }}
              >
              { prefer.name  }
                { prefer.status ?
                  <Icon style={{paddingLeft: '5px'}} size={10} icon={checkmarkRound} /> : null
                }
            </Label>
          ))}
        </div>
      }
    return (
      <div>
        <div
          style={{
            position: 'fixed',
            height: '70px',
            width: '100%',
            backgroundColor: '#4DB6AC',
            zIndex: 50,
            margin: 'auto',
            top: 0,
            boxShadow: "1px 2px 1px #9E9E9E"
          }}>
          <p style={{
            top: '50%',
            position: 'relative',
            transform: 'translateY(-50%)',
            fontSize: '20px',
            color: '#fff',
            fontWeight: 'bold'
          }}>Edit Preferences & Time</p>
        </div>
        <div className="container" style={{ padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
          <div className="selection" style={{ padding: '10px', textAlign: 'center', paddingTop:'20px', marginTop: '10px'}}>
            <Card.Content style={{ padding: '10px', textAlign: 'center', paddingTop:'10px', marginTop: '10px'}}>
              <Card.Header style={{ padding: '10px'}}>
              <h3>{ user && user.name }</h3>
              <img className="photoprofil" alt='profile logo' src={ user && user.profileImage } />
              </Card.Header>
              <Card.Meta style={{ padding: '10px', textAlign: 'center'}}>
                <span className='date'>
                  Your reading time
                </span>
                <br/>
                <div
                  style = {{
                    margin : "auto",
                    textAlign: 'center',
                    top: '45%',
                    bottom: '25%',
                    width: '200px',
                    left : 0,
                    right : 0 ,
                  }}>
                  <Input
                    fluid
                    size='large'
                    placeholder='Enter time...'
                    value={this.state.time}
                    onChange={(time) => this.timing(time)}
                    />
                </div>
              </Card.Meta>
              <Card.Description style={{ padding: '5px' }}>
                <h4>List preferences</h4>
                <FocusZone direction={ FocusZoneDirection.vertical } style={{ padding: '10px', height: '400px' }}>
                  { time }
                </FocusZone>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <div
              style={{
                position : "fixed",
                bottom : 0,
                margin : "auto",
                left : 0,
                right : 0,
                backgroundColor: '#4DB6AC',
                height: '60px',
                textAlign: 'center'
              }}>
              <Button.Group
                style={{
                  top: '50%',
                  position: 'relative',
                  transform: 'translateY(-50%)'
                }}>
                <Link to="/user">
                  <Button>Cancel</Button>
                </Link>
                <Button.Or />
                <Button
                onClick={ () => this.submit()}
                positive
                >Save</Button>
              </Button.Group>
            </div>
            </Card.Content>

          </div>
        </div>
      </div>
    )
  }
}

const savePreferences = gql`
  mutation
    preferences(
      $_id: String!,
      $category: [Preferences!]!,
      $times: Int!,
      $api : String!
    ){
      updateUser(
      input: {
        _id: $_id,
        preferences: $category,
        times: $times,
        api: $api
      }
    ){
      n
      nModified
      ok
    }}
`

const mapStateToProps = (state) => {
  return {
    config : state.configReducer
  }
}

export default withRouter(connect(mapStateToProps,null)(graphql(savePreferences)(EditUser)))
