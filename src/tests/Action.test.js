import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../App'
import { setLoginStatus } from '../redux/actions/actionConfig'
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

//cek status action
describe('Check Login Status Di ACTION', function (){
    describe('setLoginStatus', function(){
      it('Should have a type of CHANGE_LOGIN_STATUS', function () {
         expect(setLoginStatus().type).equal('CHANGE_LOGIN_STATUS')
      })
    })
})
