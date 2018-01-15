import { Button, Card, Image } from 'semantic-ui-react'
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

class Demo extends Component {
  render() {
    return ;
  }
}
class Sumary extends Component {
  render() {
    return (
      <div
        style={{
          padding: '10px',
          margin: 0,
          left: 0,
          right: 0,
          marginTop: '80px',
          paddingLeft: '20px',
          textAlign: 'center'
        }}
      >
        <Card.Group style={{margin: 'auto', textAlign: 'center'}}>
          <Card>
            <Card.Content>
              <Card.Header>
                Most reads
              </Card.Header>
              <Card.Meta>
                Statistic by category
              </Card.Meta>
              <Card.Description style={{margin: 'auto', textAlign: 'center'}}>
                <br/>
                <Chart width={200} height={200} series={series} minY={0}>
                  <Transform method='transpose'>
                    <Cloud
                      minFontSize={24}
                      maxFontSize={62}
                      padding={2}
                    />
                  </Transform>
                </Chart>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    )
  }
}

export default Sumary