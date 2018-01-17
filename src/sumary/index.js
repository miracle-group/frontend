import { Button, Card, Image, Container, Header } from 'semantic-ui-react'
import React, { Component } from 'react'
import { Chart, Cloud, Transform } from 'rumble-charts'
import { Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis} from 'recharts'
const dataSumary = [
  { subject: 'Math', A: 50},
  { subject: 'Chinese', A: 70},
  { subject: 'English', A: 30},
  { subject: 'Geography', A: 20},
  { subject: 'Physics', A: 30},
  { subject: 'History', A: 20},
];
const seriess = [{data: [{label: 'Highcharts', y: 30}]}];

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
    const fontSizeMapper = word => Math.log2(word.value) * 5;
    const rotate = word => word.value % 360;
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
          margin: 'auto'
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