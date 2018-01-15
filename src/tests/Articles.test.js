import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../App'
import Articles from '../home/detailArticle'
import Homes from '../home/index'
import { BounceLoader } from 'react-spinners'

Enzyme.configure({ adapter: new Adapter() })

global.shallow = shallow;
global.render = render;
global.mount = mount;

//config localstorage
var localStorageMock = (function() {
    var store = {};
    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
     value: localStorageMock
});

describe('Article Testing', () => {
 it('It Should Loading', () => {
   const wrapper = mount(
   <BounceLoader color={'#4DB6AC'} loading={true} />
   )
   expect(wrapper.find('sweet-loading'))
  })

  it('Styles custom articles', () => {
    const stylesArticle = shallow (
      <div
        style = {{
          position : "relative",
          margin : "auto",
          textAlign: 'center',
          paddingTop: '25%',
          paddingBottom: '25%',
          width: '60px',
        }}/>
    )
    expect(stylesArticle.prop('style'))
  })

  it('Styles custom Preferences', () => {
    const stylesPreferences = shallow (
      <div style={{
        position : "fixed",
        width : "60px",
        bottom : "5%",
        margin : "auto",
        left : 0,
        right : 0
      }}/>
    )
    expect(stylesPreferences.prop('style'))
  })

  it('Styles custom Times', () => {
    const stylesTimes = shallow (
      <div
        style = {{
          position : "relative",
          margin : "auto",
          textAlign: 'center',
          padding:0
        }}/>
    )
    expect(stylesTimes.prop('style'))
  })

  it('Styles custom Image', () => {
    const stylesImages = shallow (
      <div style={{
        width : "60px",
        height : "60px",
        display : "inline-flex",
        marginLeft:'10px'
      }}/>
    )
    expect(stylesImages.prop('style'))
  })
})
