import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser'
import { BounceLoader } from 'react-spinners'

class DetailArticle extends Component {
  componentWillMount(){
    const storage = localStorage.getItem('repodId');
    if(!storage){
      this.props.history.push('/login');
    }
  }

  render() {
    const { article } = this.props.location.query
    let showArticle = null
    if(!article) {
      showArticle =
      <div className="tes"
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
        <div>
          <h2>{article.title}</h2>
          <span>{ReactHtmlParser(article.content)}</span>
        </div>
    }
    return (
      <div className="container">
        <div className="selection">
          <Grid centered>
            <Grid.Column width={14}>
              { showArticle }
              </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}

export default DetailArticle
