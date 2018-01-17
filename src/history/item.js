import React from 'react'
import Rating from 'react-star-ratings'
import Striptag from 'string-strip-html'
import { Link } from 'react-router-dom'
import { iosHeart } from 'react-icons-kit/ionicons/iosHeart'
import { iosHeartOutline } from 'react-icons-kit/ionicons/iosHeartOutline'
import { Button, Icon, Image as ImageComponent, Item, Label } from 'semantic-ui-react'

class List extends React.Component {
  render () {
    const article = this.props.article.postId
    let content =  Striptag(article.content)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    let rate = article.rate.reduce(reducer)/ article.rate.length
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
            <Rating
              rating={ rate }
              isSelectable={ false }
              isAggregateRating={ true }
              numOfStars={ 5 }
              starWidthAndHeight={ '20px' }
              starRatedColor={ '#4DB6AC' }
            />            
            <br/>
            <br/>
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