import React, { Component } from 'react';

class DetailArticle extends Component {
  constructor(){
    super()
  }
  render() {
    const { match } = this.props
    return (
      <div>
        <h3>{ match.params.id }</h3>
      </div>
    )
  }
}

export default DetailArticle;