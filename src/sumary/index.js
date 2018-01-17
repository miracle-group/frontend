import { Button, Card, Image, Container, Header } from 'semantic-ui-react'
import React, { Component } from 'react'
import { Chart, Cloud, Transform } from 'rumble-charts'

const series = [{
  data: [
    {label: 'Highcharts', y: 30},
    {label: 'amCharts', y: 13},
    {label: 'Google Charts', y: 31},
    {label: 'ChartJS', y: 15},
    {label: 'TauCharts', y: 8},
    {label: 'FusionCharts', y: 2},
    {label: 'ZingChart', y: 2},
    {label: 'uvCharts', y: 1},
    {label: 'jQuery Sparklines', y: 1},
    {label: 'Ember Charts', y: 2},
    {label: 'Canvas.js', y: 16},
    {label: 'Flot', y: 1},
    {label: 'D3.js', y: 27},
    {label: 'n3-charts', y: 3},
    {label: 'NVD3', y: 3},
    {label: 'Chartist.js', y: 3},
    {label: 'C3.js', y: 14},
    {label: 'Cubism.js', y: 1},
    {label: 'Rickshaw', y: 2}
  ]
}];

class Sumary extends Component {
  render() {
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
            <Chart 
              width={200} 
              height={200} 
              series={series} 
              minY={0}>
              <Transform method='transpose'>
                <Cloud
                  minFontSize={24}
                  maxFontSize={82}
                  padding={1}
                />
              </Transform>
            </Chart>
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
              }}>Most reads
            </Header>
            <Chart 
              width={200} 
              height={200} 
              series={series} 
              minY={0}>
              <Transform method='transpose'>
                <Cloud
                  minFontSize={24}
                  maxFontSize={82}
                  padding={1}
                />
              </Transform>
            </Chart>
          </div>
        </Container>
      </div>
    )
  }
}

export default Sumary