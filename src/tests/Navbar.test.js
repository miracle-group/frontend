import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../App'
import Homes from '../home/index'
import { fromJS } from 'immutable';
import renderer from 'react-test-renderer';
import sinon from 'sinon'
import {mapDispatchToProps} from '../NavBar';

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

describe('Status Login Navbar Testing', () => {
    it('should call fetch data action', () => {
      const dispatchStatusLogin = sinon.spy();
      const {setLoginStatus} = mapDispatchToProps(dispatchStatusLogin());
      setLoginStatus();
      const expectedAction = setLoginStatus();
      const spyLastCall = dispatchStatusLogin.args[0][0];
      expect(spyLastCall.types).to.be.eql(expectedAction.types);
      expect(spyLastCall.callAPI).to.be.ok;
    });
})
