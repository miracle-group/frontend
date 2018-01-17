import { Button, Card, Image, Container, Header } from 'semantic-ui-react'
import React, { Component } from 'react'
import { Chart, Cloud, Transform } from 'rumble-charts'
// import WordCloud from 'react-d3-cloud'
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
        label: category.name,
        y: +category.value
      }
      newSeries.push(newData)
    })
    let data = newSeries
    this.setState({
      series: [{data}]
    })
  }

  render() {
    const fontSizeMapper = word => Math.log2(word.value) * 5;
    const rotate = word => word.value % 360;
    const { series } = this.state
    let chart = null
    console.log('====================================')
    console.log('A', series[0])
    console.log('====================================')
    console.log('====================================')
    console.log('B', seriess[0])
    console.log('====================================')
    if(series) {
      chart = 
      <Chart width={300} height={300} series={series} minY={0}>
        <Transform method='transpose'>
          <Cloud
            font='Open Sans Condensed'
            minFontSize={24}
            maxFontSize={72}
            padding={2}
            rotate={() => (~~(Math.random() * 12) - 6) * 15}
          />
        </Transform>
      </Chart>
    } else {
      chart = 'Empty'
    }
    return (
      <div>
        <Container text>
          <div 
          style={{
            padding: '10px',
            paddingLeft: '50px',
            textAlign: 'center',
            zIndex: 50,
          }}>
          <Header 
            as='h3'
            style={{
              padding: '10px',
              marginTop: '50px',
            }}
            >Most reads
            </Header>
            {chart}
          </div>
        </Container>
        <hr 
          style={{
            paddingLeft: 0,
          }}
        />
        <Container text>
          <div 
            style={{
              padding: '10px',
              paddingLeft: '50px',
              textAlign: 'center',
              zIndex: 50,
            }}>
            <Header 
              as='h3'
              style={{
                padding: '10px',
                marginTop: '5px',
              }}>Empty
            </Header>
          </div>
        </Container>
      </div>
    )
  }
}

export default Sumary