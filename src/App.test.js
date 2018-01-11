import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App'
import Homes from '../src/home/index'

Enzyme.configure({ adapter: new Adapter() });

describe('App start', () => {
  it('Rendering Began without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
})

describe('Home testing', () => {
  let Home = shallow(<Homes/>)
  it('Check load page', () => {
    expect(Home.find('li')).to.have.length(1)
  })
})