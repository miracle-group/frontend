import React, { Component } from 'react'
import './search.css'
import './readStatus.css'
import logo from '../assets/img/logo.png'
import axios from 'axios'
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
      color: null,
      status: ''
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
  }

  getCurrentLocation(){
    const article = this.props.location.query.article.postId
    let b = document.documentElement
    let newReadTime = this.state.readTime + 1
    let currentLocation = b.scrollTop
    const {
      articleDuration,
      articleHeight,
      readTime,
      maxDuration
    } = this.state
    let time_very_good = articleDuration * 0.10
    let time_good = articleDuration * 0.8
    let time_medium = articleDuration * 0.6
    let time_bad = articleDuration * 0.4
    let time_very_bad = articleDuration * 0.2
    let status = ''
    let color = ''
    if( readTime <= time_very_bad) {
      status = 'Very Bad'
      color = '#DC143C'
    } else if ( readTime <= time_bad) {
      status = 'Bad'
      color = '#FF8C00'
    } else if ( readTime <= time_medium) {
      status = 'Medium'
      color = '#00BFFF'
    } else if ( readTime <= time_good) {
      status = 'Good'
      color = '#8FBC8F'
    } else {
      status = 'Very Good'
      color = '#4DB6AC'
    }

    this.setState({
      readTime: newReadTime,
      currentLocation: currentLocation,
      articleHeight: b.scrollHeight,
      status: status,
      color: color
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
    }
  }
  componentWillMount(){
    const { article } = this.props.location.query
    const storage = JSON.parse(localStorage.getItem('repodId'))
    console.log('====================================')
    console.log(article)
    console.log('====================================')
    if(storage){
      axios.post(`http://repod.ga:8000/api/article/${article._id}/${true}`)
      axios.put(`http://repod.ga:8000/api/category/user/${storage._id}/${article._id}`)
      .then(({data})=>{
        localStorage.setItem('repodIdCategories', JSON.stringify(data))
      })
      .catch(err => {
        console.log('====================================')
        console.log(err)
        console.log('====================================')
      })
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
    const { open, color, status } = this.state
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
    } let defaultcolor = null
    if(color === '#DC143C') {
      defaultcolor = <div><div style={{ background:'#DC143C' }}>{status}</div></div>
    } else if(color === '#FF8C00') {
      defaultcolor = <div><div style={{ background:'#FF8C00' }}>{status}</div></div>
    } else if(color === '#00BFFF') {
      defaultcolor = <div><div style={{ background:'#00BFFF' }}>{status}</div></div>
    } else if(color === '#8FBC8F') {
      defaultcolor = <div><div style={{ background:'#8FBC8F' }}>{status}</div></div>
    } else {
      defaultcolor = <div><div style={{ background:'#4DB6AC' }}>{status}</div></div>
    }
    return (
      <div className="container">
        <div className="selection">
          <Grid centered>
            <Grid.Column width={14}>
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
                      right : 0 ,
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
                      right : 0 ,
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
                    left: 0,
                    position: 'fixed',
                    zIndex: 1000,
                    bottom: '1%',
                    right: '22%'
                  }}>
                  <Header>Status Reading Time</Header>
                  <div id='container2'>
                    <div id='flip'>
                      {defaultcolor}
                    </div>
                  </div>
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
