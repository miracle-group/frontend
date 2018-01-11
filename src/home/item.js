import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
const extra = (
  <a>
    16 Friends
  </a>
)
const CardExampleGroups = () => (
  <Card
    image='https://images.fitpregnancy.mdpcdn.com/sites/fitpregnancy.com/files/styles/width_360/public/11-baby-bundled-in-blue-white-fuzzy-hood-shutterstock_120651157.jpg'
    header='Elliot Baker'
    meta='Friend'
    description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
    extra={extra}
  />
)

export default CardExampleGroups