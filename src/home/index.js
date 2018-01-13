import React from 'react'
import { createListItems} from '../utils/'
import { Link } from 'react-router-dom'
import Item from './item'
import { Card, Item as Items, Grid } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Spinner from 'react-loader'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: createListItems(10),
      canSelect: 'all',
    }
  }

  componentDidMount() {
    this._hasMounted = true
  }

  _onSelectionChanged = () => {
    if (this._hasMounted) this.forceUpdate()
  }
  componentWillMount () {

  }

  render() {
    const {items} = this.state
    const { data: { article } }= this.props
    let articles = null
    if(!article) {
      articles = 
        <div 
        style = {{
          position : "relative", 
          margin : "auto",
          textAlign: 'center',
          padding:0, margin:0
          // height:'100px',
        }}>
          <Spinner style = {{
            position : "relative", 
            margin : "auto",
            textAlign: 'center',
            padding:0, margin:0
            // height:'100px',
          }} name="ball-scale-multiple" color="#4DB6AC"/>
        </div>
    } else {
      console.log('====================================')
      console.log(article)
      console.log('====================================')
      articles = 
      <Items.Group>
        {article.map((item, index) => (
          <Item key={index} article={item}/>       
        ))}
      </Items.Group> 
    }
    return (
      <div className="container">
        <div className="selection" style={{paddingTop:'40px'}}>
          <Grid centered>
            <Grid.Column width={14}>
              { articles }
            </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}

const getAllData = gql`
  query{
    article {
      _id
      title
      read_time
      preview
      content
      thumbnail
    }
  }
`
const allexport = graphql(getAllData)(Home)

export default allexport
