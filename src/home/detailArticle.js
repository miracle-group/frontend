import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'

let data = <p>Article</p>
class DetailArticle extends Component {
  constructor(){
    super()
  }
  render() {
    const { match } = this.props
    return (
      <div className="container">
        <div className="selection">
          <Grid centered>
            <Grid.Column width={14}>
              <span>{ReactHtmlParser(data)}</span>
              </Grid.Column>
            </Grid>
        </div>
        </div>
    )
  }
}

export default DetailArticle;