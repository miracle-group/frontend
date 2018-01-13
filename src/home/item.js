import React from 'react'
import { Card, Image, Item } from 'semantic-ui-react'
const extra = (
  <a>
    16 Friends
  </a>
)
const List = () => (
  <Item>
    <Item.Image size='tiny' src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
    <Item.Content>
      <Item.Header as='a'>Header</Item.Header>
      <Item.Meta>Description</Item.Meta>
      <Item.Description>
        <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
      </Item.Description>
      <Item.Extra>Additional Details</Item.Extra>
    </Item.Content>
  </Item>
)

export default List