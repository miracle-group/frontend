import React, { Component } from 'react'
import axios from 'axios'
import logo from '../assets/img/logo.png'
import logoblack from '../assets/img/logoblack.png'
import ReactHtmlParser from 'react-html-parser'
import { BounceLoader } from 'react-spinners'
import { Grid, Button, Header, Segment, TransitionablePortal, Image } from 'semantic-ui-react'


class DetailArticle extends Component {
  constructor(){
    super()
    this.state = {
      readTime: 0,
      prevLocation: 0,
      articleDuration: 0,
      read: false,
      jumpInterval: 0,
      tolerance: 0,
      maxDuration: 0,
      currentLocation: 0,
      open: false,
      readRating: '',
      readingTimeCounter: 0
    }
    this.checker = ''
    this.articleHeight = 0
    this.clientHeight = 0
  }
  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  componentDidMount() {
    let b = document.documentElement
    let jumpInterval = b.scrollHeight / this.state.articleDuration
    let tolerance = window.innerHeight * 0.10

    this.articleHeight = b.scrollHeight
    this.clientHeight = b.clientHeight
    this.setState({jumpInterval: jumpInterval, tolerance: tolerance})
    this.checker = setInterval(this.getCurrentLocation.bind(this), 1000)
    console.log('====================================')
    console.log(this.props)
    console.log('====================================')
  }

  getCurrentLocation(){
    const article = this.props.location.query.article.postId
    let b = document.documentElement
    let newReadTime = this.state.readTime + 1
    let currentLocation = b.scrollTop

    // Counting reading time rating
    let toSecond = this.state.articleDuration
    let bad = toSecond * 0.2
    let medium = toSecond * 0.4
    let good = toSecond * 0.6
    let veryGood = toSecond * 0.8
    let status = ''

    if (newReadTime >= veryGood) {
      status = 'Very Good'
    } else if (newReadTime >= good) {
      status ='Good'
    } else if (newReadTime >= medium) {
      status = 'Medium'
    } else if (newReadTime >= bad) {
      status = 'Bad'
    } else {
      status = 'Very Bad'
    }

    this.setState({
      readTime: newReadTime,
      currentLocation: currentLocation,
      articleHeight: b.scrollHeight,
      readRating: status,
      readingTimeCounter: newReadTime
    })

    this.checkScroll(newReadTime, currentLocation)
  }
  checkScroll(newReadTime, currentPostition) {
    console.log(`newReadTime = ${newReadTime}`)
    console.log(`currentPostition = ${currentPostition}`)
    const isReadingNotTooFast = currentPostition <= ((newReadTime * this.state.jumpInterval) + this.state.tolerance)
    const isReadingNotTooSlow = currentPostition >= (((newReadTime / 2) * this.state.jumpInterval) + this.state.tolerance)
    const startCounting = newReadTime < 3
    if ( isReadingNotTooFast && isReadingNotTooSlow ) {
      console.log('masih oke')
    }
    else {
      console.log('mencurigakan')
      console.log('kondisiA', isReadingNotTooFast)
      console.log('kondisiB', isReadingNotTooSlow)
      console.log('articleDuration', this.state.articleDuration);
    }
  }
  componentWillMount(){
    const { article } = this.props.location.query
    const storage = JSON.parse(localStorage.getItem('repodId'))
    if(storage){
      axios.post(`http://repod.ga:8000/api/article/${article._id}/${true}`)
      this.setState({
        articleDuration: article.postId.read_time * 60,
        maxDuration: (article.postId.read_time * 60) * 2
      })
    } else {
      this.props.history.push('/login')
    }
  }
  componentWillUnmount () {
    const { article } = this.props.location.query
    const {
      articleDuration,
      currentLocation,
      articleHeight,
      readTime,
      maxDuration
    } = this.state
    let very_good = articleHeight * 0.8
    let good = articleHeight * 0.6
    let medium = articleHeight * 0.4
    let bad = articleHeight * 0.2
    let time_very_good = articleDuration * 0.8
    let time_good = articleDuration * 0.6
    let time_medium = articleDuration * 0.4
    let time_bad = articleDuration * 0.2
    const nilai = (value) => {
      axios.put(`http://repod.ga:8000/api/article/${article.postId._id}/${value}`)
    }
    if( currentLocation <= bad) {
      if( readTime <= time_bad) {
        nilai(1)
      } else if ( readTime <= time_medium) {
        nilai(2)
      } else if ( readTime <= time_good) {
        nilai(3)
      } else if ( readTime  <= time_very_good) {
        nilai(4)
      } else {
        nilai(5)
      }
    } else if ( currentLocation <= medium) {
      if( readTime <= time_bad) {
        nilai(1)
      } else if ( readTime <= time_medium) {
        nilai(2)
      } else if ( readTime <= time_good) {
        nilai(3)
      } else if ( readTime  <= time_very_good) {
        nilai(4)
      } else {
        nilai(5)
      }
    } else if ( currentLocation <= good) {
      if( readTime <= time_bad) {
        nilai(1)
      } else if ( readTime <= time_medium) {
        nilai(2)
      } else if ( readTime <= time_good) {
        nilai(3)
      } else if ( readTime  <= time_very_good) {
        nilai(4)
      } else {
        nilai(5)
      }
    } else if ( currentLocation  <= very_good) {
      if( readTime <= time_bad) {
        nilai(1)
      } else if ( readTime <= time_medium) {
        nilai(2)
      } else if ( readTime <= time_good) {
        nilai(3)
      } else if ( readTime  <= time_very_good) {
        nilai(4)
      } else {
        nilai(5)
      }
    } else {
      if( readTime <= time_bad) {
        nilai(1)
      } else if ( readTime <= time_medium) {
        nilai(2)
      } else if ( readTime <= time_good) {
        nilai(3)
      } else if ( readTime  <= time_very_good) {
        nilai(4)
      } else {
        nilai(5)
      }
    }
  }
  render() {
    const article = this.props.location.query.article.postId
    const { open } = this.state
    let showArticle = null
    if(!article) {
      showArticle =
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
      showArticle =
        <div
          style = {{
            paddingTop: '80px'
          }}>
          <h2>{article.title}</h2>
          <span>{ReactHtmlParser(article.content)}</span>
        </div>
    }
    return (
      <div className="container">
        <div className="selection">
          <Grid centered>
            <Grid.Column width={14}>
              {this.state.readTime}
              { showArticle }
              <TransitionablePortal
                closeOnTriggerClick
                onOpen={this.handleOpen}
                onClose={this.handleClose}
                openOnTriggerClick
                trigger={(
                  open ?
                  <div
                    style={{
                      position : "fixed",
                      width : "100px",
                      bottom : "1%",
                      right : '35%',
                    }}>
                    <div
                      style={{
                        width : "60px",
                        height : "60px",
                        display : "inline-flex",
                        marginLeft:'10px'
                      }}>
                      <Image
                        src={logoblack}
                        centered
                        size='small'
                        className='logoColor'
                        onClick={ () => this.setState({
                          open: true
                        })}
                      />
                    </div>
                  </div>
                  :
                  <div
                    style={{
                      position : "fixed",
                      width : "100px",
                      bottom : "1%",
                      right : '35%' ,
                    }}>
                    <div
                      style={{
                        width : "60px",
                        height : "60px",
                        display : "inline-flex",
                        marginLeft:'10px'
                      }}>
                      <Image
                        src={logo}
                        centered
                        size='small'
                        className='logoColor'
                        onClick={ () => this.setState({
                          open: false
                        })}
                      />
                    </div>
                  </div>
                  )}>
                <Segment
                  style={{
                    position: 'fixed',
                    zIndex: 1000,
                    bottom: '150px',
                    left: '20%',
                    right: '20%',
                    width: 'auto',
                    backgroundColor: '#88acad'
                  }}>
                  <Header style={{color: 'white'}}>Article Rating Based on Reading Time</Header>
                  <h4 style={{color: 'white'}}>Rating Status:</h4>
                  {(() => {
                    switch (this.state.readRating) {
                      case 'Very Bad': return (<h4 style={{ color: 'red'}}>{this.state.readRating}</h4>)
                      case 'Bad': return (<h4 style={{ color: 'yellow'}}>{this.state.readRating}</h4>)
                      case 'Medium': return (<h4 style={{ color: 'yellow'}}>{this.state.readRating}</h4>)
                      case 'Good': return (<h4 style={{ color: 'green'}}>{this.state.readRating}</h4>)
                      case 'Very Good': return (<h4 style={{ color: 'green'}}>{this.state.readRating}</h4>)
                      default: return (<p>none</p>)
                    }
                  })()}
                  <h4 style={{color: 'white'}}>Reading Time Counter: {this.state.readingTimeCounter}</h4>
                </Segment>
              </TransitionablePortal>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}

export default DetailArticle
