import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
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
            <Grid.Column width={12}>
              <span>{match.params.id} Hey there! heart_eyes Looks like you're
              enjoying the discussion, but you're not signed up for an account.
              When you create an account, we remember exactly what you've read, 
              so you always come right back where you left off. You also get
              notifications, here and via email, whenever new posts are made. 
              And you can like posts to share the love. heartbeat</span>
              <span>{match.params.id} Hey there! heart_eyes Looks like you're
              enjoying the discussion, but you're not signed up for an account.
            When you create an account, we remember exactly what you've read, 
            so you always come right back where you left off. You also get
            notifications, here and via email, whenever new posts are made. 
            And you can like posts to share the love. heartbeat</span>
            <span>{match.params.id} Hey there! heart_eyes Looks like you're
            enjoying the discussion, but you're not signed up for an account.
            When you create an account, we remember exactly what you've read, 
            so you always come right back where you left off. You also get
            notifications, here and via email, whenever new posts are made. 
            And you can like posts to share the love. heartbeat</span>
            <span>{match.params.id} Hey there! heart_eyes Looks like you're
            enjoying the discussion, but you're not signed up for an account.
            When you create an account, we remember exactly what you've read, 
            so you always come right back where you left off. You also get
            notifications, here and via email, whenever new posts are made. 
            And you can like posts to share the love. heartbeat</span>
            <span>{match.params.id} Hey there! heart_eyes Looks like you're
            enjoying the discussion, but you're not signed up for an account.
            When you create an account, we remember exactly what you've read, 
            so you always come right back where you left off. You also get
            notifications, here and via email, whenever new posts are made. 
            And you can like posts to share the love. heartbeat</span>
            <span>{match.params.id} Hey there! heart_eyes Looks like you're
            enjoying the discussion, but you're not signed up for an account.
          When you create an account, we remember exactly what you've read, 
          so you always come right back where you left off. You also get
          notifications, here and via email, whenever new posts are made. 
          And you can like posts to share the love. heartbeat</span>
              </Grid.Column>
            </Grid>
        </div>
        </div>
    )
  }
}

export default DetailArticle;