import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import Homes from '../src/home/index'

Enzyme.configure({ adapter: new Adapter() })

global.shallow = shallow;
global.render = render;
global.mount = mount;


describe('Home testing', () => {
  let Home = shallow(<Homes/>)
  it('Check load page home', () => {
    expect(Home.find('Route'))
  })

  let DetailArticle = shallow(<DetailArticle/>)
  it('Check load page DetailArticle', () => {
    expect(DetailArticle.find('Route'))
  })

  let Preference = shallow(<Preference/>)
  it('Check load page Preference', () => {
    expect(Preference.find('Route'))
  })

  let User = shallow(<User/>)
  it('Check load page User', () => {
    expect(User.find('Route'))
  })
})
