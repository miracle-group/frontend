import React from 'react'
import { createListItems} from '../utils/'
import { Link } from 'react-router-dom'
import Item from './item'
import { Card } from 'semantic-ui-react'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: createListItems(30),
      canSelect: 'all',
    }
  }

  componentDidMount() {
    this._hasMounted = true
  }

  _onSelectionChanged = () => {
    if (this._hasMounted) this.forceUpdate()
  }

  render() {
    let good = 'imaginasi'
    const {items} = this.state
    return (
      <div className="container">
        <div className="selection">
          <div>
            <ul>
              <li>
                <Link to={`article/${good}`}>
                  Rendering with React
                </Link>
              </li>
            </ul>
          </div>
          <Card.Group>
              {items.map((item, index) => (
                <Item key={index}/>       
              ))}
          </Card.Group>  
        </div>
      </div>
    )
  }
}

export default Home
