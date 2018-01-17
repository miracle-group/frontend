import React from 'react'
import './search.css'
import io from 'socket.io-client';
import gql from 'graphql-tag'
import Item from './item'
import axios from 'axios'
import SearchInput, { createFilter } from 'react-search-input'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { Item as Items, Grid } from 'semantic-ui-react'
import { setPosts, setLoading } from '../redux/actions/actionPost';
const KEYS_TO_FILTERS = ['postId.title']

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canSelect: 'all',
      searchTerm: '',
      article: null,
      clientId : null
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
    const { config, socket } = this.props
    const storage = JSON.parse(localStorage.getItem('repodId'));
    if(storage){
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
            if(!randomArticle[idx].read_status){
              arrArticles.push(randomArticle[idx])
              calculation += randomArticle[idx].postId.read_time
            }
          }
        }
        this.props.setPosts(arrArticles);
      }).catch(err => {
        console.log(err)
      });
    }else{
      this.props.history.push('/login');
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      clientId : nextProps.config.clientId,
      article : nextProps.post.posts
    });
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
            width: '50%',
          }}>
          <div 
            className='sweet-loading' 
            style={{
              display: 'inline-block'
            }}>
            <BounceLoader
              color={'#4DB6AC'}
              loading={true}
            />
          </div>
          <h3 style={{textAlign: 'center', margin : "auto",}}>Loading articles suggestion...</h3>
        </div>
    } else {
      const filteredArticle = article.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
      articles =
      <Items.Group
        divided 
        style={{
          backgroundColor: '#FFF',
          padding: '15px',
          margin: '5px',
          fontSize: '12px'
        }}>
        {filteredArticle.map((item, index) => (
          <Item key={index} article={item}/>
        ))}
      </Items.Group>
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
            margin: 'auto'
          }}>
          <SearchInput
            className="search-input"
            onChange={this.searchUpdated}
            style={{
              top: '35%',
              margin: 'auto',
              width: 'auto',
              zIndex: 100,
              marginTop: '0',
              marginLeft: '50px',
            }}/>
        </div>
        <div
          className="container">
          <div
            className="selection"
            style={{
              paddingTop:'100px',
              paddingRight: '20px',
              height: '100px',
            }}>
            <Grid centered>
              <Grid.Column
                width={14}
                style={{
                  width: '100%',
                  paddingRight: '0px',
                  paddingLeft: '0px'
                }}>
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
    user : state.configReducer.user,
    post : state.postReducer  // this.props.post.posts, this.props.post.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPosts : (posts) => dispatch(setPosts(posts)),
    setLoading : (status) => dispatch(setLoading(status))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(graphql(getAllData)(Home)));
