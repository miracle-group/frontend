import React from 'react'
import {MarqueeSelection} from 'office-ui-fabric-react/lib/MarqueeSelection'
import {
  Selection,
  SelectionMode,
  SelectionZone,
} from 'office-ui-fabric-react/lib/utilities/selection'
import {Check} from 'office-ui-fabric-react/lib/Check'
import { createListItems} from '../utils/'
import { Link } from 'react-router-dom'
import { ActivityItem } from 'office-ui-fabric-react/lib/ActivityItem'
import Item from './item'
import { Button, Card, Image } from 'semantic-ui-react'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      items: createListItems(30),
      selection: new Selection({onSelectionChanged: this._onSelectionChanged}),
      selectionMode: SelectionMode.multiple,
      canSelect: 'all',
    }
    this.state.selection.setItems(this.state.items, false)
  }

  componentDidMount() {
    this._hasMounted = true
  }

  _onSelectionChanged = () => {
    if (this._hasMounted) this.forceUpdate()
  }

  render() {
    let good = 'imaginasi'
    const {breadcrumbs, maxBreadcrumbs, menuItems, farMenuItems} = this.props
    const {items, selection, selectionMode} = this.state
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