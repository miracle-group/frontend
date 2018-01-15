import React from 'react'
import Item from './item'
import gql from 'graphql-tag'
import SearchInput, {createFilter} from 'react-search-input'
import './search.css'
import { BounceLoader } from 'react-spinners'
import { withRouter } from 'react-router-dom'
import { Item as Items, Grid } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import axios from 'axios'

const KEYS_TO_FILTERS = ['title', 'content']
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canSelect: 'all',
      searchTerm: '', 
      article: null
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
    const { config } = this.props
    const storage = JSON.parse(localStorage.getItem('repodId'))
    if(storage) {
      axios.get(`${config.expressApi}/article/all/${storage._id}`)
      .then(({data}) => {
        const times = storage.times
        let calculation = 0
        let arrArticles = []
        let randomArticle = ''
        Array.prototype.shuffled = function() {
          return this.map(function(n){ return [Math.random(), n] })
                    .sort().map(function(n){ return n[1] })
        }
        if(data) {
          randomArticle = data.shuffled()
        }
        for (let idx = 0; idx < randomArticle.length; idx++) {
          if(calculation <= times + 3) {
            arrArticles.push(randomArticle[idx])
            calculation += randomArticle[idx].postId.read_time
          }
        }
        this.setState({
          article: arrArticles
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
    
    if(!storage){
      this.props.history.push('/login');
    }
  }

  render() {
    const { article }= this.state
    let articles = null
    if(!article) {
      articles = 
        <div 
          style = {{
            position : "relative",
            margin : "auto",
            textAlign: 'center',
            paddingTop: '25%',
            paddingBottom: '25%',
            width: '60px',
          }}>
          <div 
            className='sweet-loading'>
            <BounceLoader
              color={'#4DB6AC'} 
              loading={true} 
            />
          </div>
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
        <div 
          className="container">
          <div 
            className="selection" 
            style={{
              paddingTop:'40px'
            }}>
            <Grid centered>
              <Grid.Column 
                width={14}>
                <SearchInput
                  className="search-input" 
                  onChange={this.searchUpdated} 
                  style={{
                    position: 'fixed', 
                    top: 0, 
                    height: '40px', 
                    margin: 'auto', 
                    zIndex: 100
                  }}/>
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

const mapStateToProps = (state) => {
  return {
    config : state.configReducer,
    user : state.configReducer.user
  }
}

export default withRouter(connect(mapStateToProps ,null)(Home))
// export default withRouter(graphql(getAllData)(Home))