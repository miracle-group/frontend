import React from 'react'
import { Button, Icon, Image as ImageComponent, Item, Label } from 'semantic-ui-react'
import Striptag from 'string-strip-html'
import { Link } from 'react-router-dom'

class List extends React.Component {
  render () {
    const article = this.props.article.postId
    let content =  Striptag(article.content)
    return(
      <Item>
        <Item.Image src={article.thumbnail}/>
        <Item.Content style={{ paddingLeft: '25px'}}>
          <Link 
            to={{ 
              pathname: `/article/detail/${article._id}`, 
              query: { article: this.props.article } 
            }}
            style={{fontWeight: 'bold'}}>
            <Item.Header style={{fontSize: '18px', fontWeight: 'bold'}}>{ article.title }</Item.Header>
          </Link>
          <Item.Meta>
            <span className='cinema'>time {article.read_time} min reads</span>
          </Item.Meta>
          <Item.Description> 
            <p>
              {content.substring(0,100)}...
            </p>
          </Item.Description>
          <Item.Extra>
          <Link 
            to={{ 
              pathname: `/article/detail/${article._id}`, 
              query: { article: this.props.article } 
            }}>
            <Button 
              primary 
              floated='right'>
                Read more
            </Button>
          </Link>
            {article.categories.map((list, i) => {
              return <Label key={i}>{list}</Label>
            })}
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default List