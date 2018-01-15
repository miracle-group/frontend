import React, { Component } from 'react';
import Halogen from 'halogen'

let color = '#4DB6AC'
let style = {
  display: '-webkit-flex',
  display: 'flex',
  WebkitFlex: '0 1 auto',
  flex: '0 1 auto',
  WebkitFlexDirection: 'column',
  flexDirection: 'column',
  WebkitFlexGrow: 1,
  flexGrow: 1,
  WebkitFlexShrink: 0,
  flexShrink: 0,
  WebkitFlexBasis: '25%',
  flexBasis: '25%',
  maxWidth: '25%',
  height: '200px',
  WebkitAlignItems: 'center',
  alignItems: 'center',
  WebkitJustifyContent: 'center',
  justifyContent: 'center'
}
const Loading = () => (
    <div style={{
      boxSizing: 'border-box',
      display: '-webkit-flex',
      display: 'flex',
      WebkitFlex: '0 1 auto',
      flex: '0 1 auto',
      WebkitFlexDirection: 'row',
      flexDirection: 'row',
      WebkitFlexWrap: 'wrap',
      flexWrap: 'wrap'
    }}>
      <div style={style}><Halogen.BounceLoader color={color}/></div>
    </div>
  )

export default Loading