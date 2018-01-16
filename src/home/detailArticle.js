import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser'
import { BounceLoader } from 'react-spinners'
import axios from 'axios'

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
      maxDuration: 0
    }
    // this.articleDuration = 0.5 * 60
    this.checker = ''
    this.articleHeight = 0
    this.clientHeight = 0
    // this.read = false
    // this.jumpInterval = 0
    // this.tolerance = 0
    // this.maxDuration = this.articleDuration * 2
  }
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

    this.setState({readTime: newReadTime})

    this.checkScroll(newReadTime, currentLocation)

    // check jika sudah scroll mentok
    console.log('====================================')
    console.log(b.scrollHeight, 'TINGGI')
    console.log('====================================')
    // if (b.scrollHeight - b.scrollTop === b.clientHeight) {
    //   clearInterval(this.checker)
    //   let detik = this.state.readTime
    //   alert(`kamu membaca selama ${detik} detik`)
    // }
    // // check kalo durasi baca lebih lama dari yang disebut
    // if (newReadTime > this.state.maxDuration) {
    //   alert('kelamaan cuk')
    //   clearInterval(this.checker)
    // }
    if(b.scrollHeight >= 1500) {
      if(currentLocation >= b.scrollHeight - 1000) {
        console.log('====================================')
        console.log('masuk')
        console.log('====================================')
        console.log('====================================')
        console.log(newReadTime)
        console.log(article.read_time, '====================================')
        if(newReadTime >= (article.read_time * 60) - ((article.read_time * 60) * (20 / 100))) {
          alert('good')
        } else if(newReadTime >= (article.read_time * 60) / 2){
          alert('medium')
        } else {
          alert('bad')
        }
        clearInterval(this.checker)
      }
    } else {
      alert('halaman sedikit')
      clearInterval(this.checker)
    }

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

  // useful event listener
  handleScroll() {
    // console.log(document.getElementById('root').scrollTop)
    // console.log(window.pageYOffset)
  }
  componentWillMount(){
    const { article } = this.props.location.query
    const storage = JSON.parse(localStorage.getItem('repodId'))
    if(storage){
      console.log('====================================')
      console.log(article)
      console.log('====================================')
      axios.post(`http://repod.ga:8000/api/article/${article._id}/${true}`)
      this.setState({
        articleDuration: article.postId.read_time * 60,
        maxDuration: (article.postId.read_time * 60) * 2
      })
    } else {
      this.props.history.push('/login')
    }
  }
 
  render() {
    const article = this.props.location.query.article.postId
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
    console.log('====================================')
    console.log('VALUE', this.state.readTime)
    console.log('====================================')
    return (
      <div className="container">
        <div className="selection">
          <Grid centered>
            <Grid.Column width={14}>
              {this.state.readTime}
              { showArticle }
              </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}

export default DetailArticle
