import React from 'react'
import './search.css'
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
    const { config } = this.props
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
      // [{
      //   category: "art",
      //   postId: {
      //     author: "Joe Gallagher",
      //     categories: [],
      //     content: '"<h4>Why we eloped at the museum, and why it should remain free.</h4><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*lYUD5olsbgo9rFjEzGEOOw.jpeg" /><figcaption>Our wedding day at the Met. Photo by Emily Gude.</figcaption></figure><p>The day my wife and I eloped at the Met, we paid full price for our admission, as did the dozen or so friends and family in our small wedding party, as far as I know. After our stop at the admissions counter, we continued the winding walk back to the American Wing, passing Byzantine busts and Roman mosaics. I was in a suit jacket, jeans, and brand new Nikes; my wife wore a coat to conceal her dress.</p><p>With purpose we entered the Medieval hall and made a right through the treasury of silver and gold liturgical objects, colored by French stained glass. We arrived at the spectacular Charles Englehard Court, a three-story enclosed sculpture garden, bathed in light that morning through slanted windows above. Here, our very romantic, very unauthorized, and very short ceremony would take place.</p><p>Afterwards, we toured the the museum, taking silly photos in the Greco-Roman wing, eating a donut in the café while we signed our marriage license, dancing our first dance to the opera having an open rehearsal at the Temple of Dendur.</p><p>The Met that morning was full of visitors who had <em>not</em> paid $25. Some because they didn’t want to, some because they couldn’t afford it, but all of us had been drawn there for reasons beyond the mere economic transaction of exchanging money for a few hours with great works of art.</p><p>When discussing where we should elope, my wife and I thought of many places in the world, but as soon as I mentioned the Met we both knew it was right. The museum reflected the complexity of our deep connection and desire, a consuming passion that not all of our friends and family fully understood. Here, we could commit to one another on our terms, in a cathedral that generously celebrated the full range of human experience.</p><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*7aUYGUrGr7VagdfsrXsF9Q.jpeg" /><figcaption>Walking past Roman and Byzantine art on the way to get married. Photo by Emily Gude.</figcaption></figure><p>Unique among New York’s museums, experiencing the collection at the Met, from <a href="https://www.metmuseum.org/art/collection/search/11417"><em>Washington Crossing the Delaware</em></a> to <a href="https://www.metmuseum.org/art/collection/search/544227">William the Hippo</a>, is not about getting your money’s worth. Instead, it’s about finding what you need. That could be transcendent beauty, deep meditation, or a new perspective that gives you the insight you seek, no matter what is going on in your life.</p><p>Now the Met wants to end that special relationship with its public. A new policy for 2018 calls for the full $25 admission fee from virtually every visitor. This place of refuge in Central Park, another one of the world’s great free public spaces, will have a barrier around it. For many people, $25 is still a lot of money, so their open access to this art is now a closed door. This change should be a last resort, not the first choice for shoring up a short-term financial crunch.</p><p>The Met’s decision to preserve restricted free admission based on ID cards is especially troublesome. As Roberta Smith wrote in the New York Times, ID cards are inherently “<a href="https://www.nytimes.com/2018/01/04/arts/design/the-met-should-be-open-to-all-the-new-pay-policy-is-a-mistake.html?">classist and nativist</a>,” punishing disadvantaged groups, such as illegal immigrants and the poor, whom the Met should be proud to serve. They are abandoning this <a href="https://twitter.com/Alex_Lily/status/948971728134434817">ethical mission</a> and instead telling these disadvantaged groups, “<a href="https://twitter.com/rachsyme/status/949027862455160832">This world is not for you</a>.”</p><p>Most importantly, the Met should be free because democracy is an essential tenet of its character, promising an equality of opportunity for any person who wants to join in knowing these great works. What a joy it’s been for all the Met’s guests to experience those works on common ground, and what a shame it will be to lose that spirit of a shared and human purpose.</p><p>In the photos of our ceremony, my wife and I stand with our friends in a small circle, under Augustus Saint-Gaudens’s gilded statue of Diana. Security guards and tourists alike watch from a distance, curious but approving. As we exchanged our vows, we, like everyone else there that day, attempted to bind ourselves a little to the beauty around us.</p><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*IEHLdQQ-MlYHp1mv2CjCYA.jpeg" /></figure><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*qLUZtDvsMBBTlp472AwPbA.jpeg" /><figcaption>Our ceremony in the American Wing. Photo on the left by Hank Byron; on the right by Emily Gude.</figcaption></figure><p>The Met has put a price on your search for communion. It’s another walled garden, a right for those with privilege, only a special treat for anyone who has not “earned” entry with money or an ID card.</p><p>I urge those who love the museum to protect its place as the shining heart of New York City’s artistic body. Protect it by protesting this decision now, with calls, letters and emails to the museum, and protect it by continuing to believe that we can find a way to help the Met reverse its decision sometime in the future. In the meantime, if you’re walking out of the Met… stop and give your ticket to someone else coming in! Even if the spirit of equality disappears from the rules and regulations of the Met, it can stay strong among those who love this place, and hope to share its art freely with generations of visitors to come.</p><p>And pay the admission fee if you can afford it. Hopefully you will be investing in the future for those who cannot.</p><p><a href="https://www.metmuseum.org/about-the-met/contact">Contact the Met here</a>.</p><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*IU-jTQOY1Jkb1cb9yp2Kdw.jpeg" /></figure><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*NukXcwm6SOZo23mBIlE-fw.jpeg" /><figcaption>Our first dance, at the open rehearsal of an opera in the Temple of Dendur. Photos by Emily Gude.</figcaption></figure><p><em>Joe Gallagher lives with his wife, son, and puggle in Portland, OR. He works in advertising.</em></p><p><em>All photos in this article by </em><a href="http://www.egudephoto.com/"><em>Emily Gude</em></a><em>, a brilliant artist and skilled documentarian based in Frederick, MD.</em></p><img src="https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=dfc2ca57803a" width="1" height="1">"',
      //     createdAt: "2018-01-10T15:48:43.000Z",
      //     postId: "dfc2ca57803a",
      //     rate: [5],
      //     read_time: 5,
      //     tags: [],
      //     thumbnail: "http://cdn-images-1.medium.com/max/800/1*lYUD5olsbgo9rFjEzGEOOw.jpeg",
      //     title: "Freedom of Admission at the Met",
      //     _id: "5a5df5421f567a0002deb5e6"
      //   },
      //   read_status: false,
      //   userId: "5a601b092cd80558be8ef086",
      //   _id: "5a601b112cd80558be8ef087"
      // }]
      articles =
      <Items.Group
        divided
        style={{
          backgroundColor: '#FFF',
          padding: '15px',
          margin: '5px',
          fontSize: '12px'
        }}>
        {console.log(filteredArticle)}
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
            margin: 'auto',
            boxShadow: "1px 2px 1px #9E9E9E"
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
                { article ? articles : <div></div> }
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
