import React from 'react'
import { Item } from 'semantic-ui-react'
import Striptag from 'striptags'
import { Link } from 'react-router-dom'

class List extends React.Component {
  render () {
    const { article } = this.props
    let content =  Striptag(article.content)
    return(
      <Item>
        <Item.Image size='tiny' src={article.thumbnail} />
        <Item.Content style={{ paddingLeft: '25px'}}>
          <Item.Header as='a'>{ article.title }</Item.Header>
          <Item.Meta>time {content.read_time}</Item.Meta>
          <Item.Description>
            <p>
              {content.substring(0,100)}...
            </p>
          </Item.Description>
          <Item.Extra>
            <Link to={{ pathname: `/article/detail/${article._id}`, query: { article } }}>Read more</Link>
          </Item.Extra>
        </Item.Content>
        <br/>
        <hr/>
      </Item>
    )
  }
}

export default List