import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {createListItems} from '../utils/'
import Item from './item'
import { Card, Item as Items, Grid } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Spinner from 'react-loader'
import Search from './search'
import SearchInput, {createFilter} from 'react-search-input'
import './search.css'

const KEYS_TO_FILTERS = ['title', 'content']
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: createListItems(10),
      canSelect: 'all',
      searchTerm: ''
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  componentDidMount () {
    this._hasMounted = true
  }

  _onSelectionChanged = () => {
    if (this._hasMounted) this.forceUpdate()
  }

  componentWillMount(){
    const storage = localStorage.getItem('repodId');
    if(!storage){
      this.props.history.push('/login');
    }
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
      const filteredArticle = article.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
      articles = 
      <Items.Group>
        {filteredArticle.map((item, index) => (
          <Item key={index} article={item}/>       
        ))}
      </Items.Group> 
    }
    return (
      <div>
        <div className="container">
          <div className="selection" style={{paddingTop:'40px'}}>
            <Grid centered>
              <Grid.Column width={14}>
                <SearchInput className="search-input" onChange={this.searchUpdated} style={{position: 'fixed', top: 0, height: '40px', margin: 'auto'}}/>
                { articles }
              </Grid.Column>
            </Grid>
          </div>
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
export default withRouter(graphql(getAllData)(Home));