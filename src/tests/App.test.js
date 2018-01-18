import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../App'
import Homes from '../home/index'
import { fromJS } from 'immutable';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() })

global.shallow = shallow;
global.render = render;
global.mount = mount;

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

describe('App Testing', () => {
  let Home = shallow(<Homes/>)
  it('Check load page home', () => {
    expect(Home.find('Route'))
  })
  it('Check Fabric class name is App', () => {
    expect(Home.find('Fabric'))
  })
  it('Check Provider Apps Required', () => {
    expect(Home.find('Provider'))
  })
  it('Check ApolloProvider Apps Required', () => {
    expect(Home.find('ApolloProvider'))
  })
})
