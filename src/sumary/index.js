import { Container } from 'semantic-ui-react'
import React, { Component } from 'react'
import { Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis} from 'recharts'

class Sumary extends Component {
  constructor () {
    super()
    this.state = {
      series: null
    }
  }
  componentWillMount () {
    const categories = JSON.parse(localStorage.getItem('repodIdCategories'))
    let newSeries = []
    categories.map(category => {
      let newData = {
        subject: category.name,
        A: +category.value
      }
      newSeries.push(newData)
    })
    this.setState({
      series: newSeries
    })
  }

  render() {
    const { series } = this.state
    let chart = null
    if(series) {
      chart = 
      <RadarChart 
        style={{
          margin: 'auto', 
          padding: 0, 
          paddingTop: '50%',
          fontSize: '15px',
          fontWeight: 'bold'
        }}
        cx={170} 
        cy={100} 
        outerRadius={60} 
        width={300} 
        height={300} 
        data={series}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis/>
        <Radar name="Mike" dataKey="A" stroke="rgb(77, 182, 172)" fill="rgb(77, 182, 172)" fillOpacity={0.6}/>
      </RadarChart>
    } else {
      chart = 'Empty'
    }
    return (
      <div>
        <div
        style={{
          position: 'fixed',
          height: '70px',
          width: '100%',
          backgroundColor: '#4DB6AC',
          zIndex: 50,
          margin: 'auto',
          boxShadow: "1px 2px 1px #9E9E9E"
        }}>
        <p style={{
          top: '50%',
          position: 'relative',
          transform: 'translateY(-50%)',
          fontSize: '20px',
          color: '#fff',
          fontWeight: 'bold'
        }}>Most Reads</p>
        </div>
        <Container text>
          <div 
          style={{
            padding: '10px',
            textAlign: 'center',
            zIndex: 50,
            paddingTop: '30px',
            paddingLeft: 0,
            marginLeft:0
          }}>            
            {chart}
          </div>
        </Container>
      </div>
    )
  }
}

export default Sumary