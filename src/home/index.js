import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Item as Items} from 'semantic-ui-react';
import {createListItems} from '../utils/'
import Item from './item'

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
  componentWillMount(){
    const storage = localStorage.getItem('repodId');
    if(!storage){
      this.props.history.push('/login');
    }
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
          <div style={{padding: '30px', paddingLeft:'10px'}}>
            <Items.Group>
              {items.map((item, index) => (
                <Item key={index}/>
              ))}
            </Items.Group>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home);
