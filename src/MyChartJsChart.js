
import React from 'react';
import {reaction} from 'mobx';
import {observer, inject} from 'mobx-react';
import {Line} from 'react-chartjs-2';

const data = {
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 10,
      data: []
    }
  ]
};

const options = {
  animation: false,
  responsive: true,
  tooltips: {
      enabled: true,
      intersect: false,
      //callbacks: {
      //    label: function(tooltipItem, data) {
      //        return tooltipItem.yLabel;
      //    }
      //},
  },
  
  scales: {
      xAxes: [{
          display: true,
          type: 'time',
          scaleLabel: {
              display: true,
              labelString: 'Data'
          },
          gridLines: {
              display:false
          },
          time: {
              tooltipFormat: "LL LTS",
              displayFormats: {
                  millisecond: 'h:mm:ss a'
              }
          }
      }],
      yAxes: [{
          display: true,
          scaleLabel: {
              display: true,
              labelString: 'Value'
          },
      }]
  }
};

@inject('store') @observer
class MyHighchartsChart extends React.Component {

  componentDidMount() {
    this.chart = this.refs.chart.chartInstance;  
    let self = this;
    let data = self.props.store.sensors;

    const reaction2 = reaction(
      () => data.get('sensor1').queue.modified,
      modified => {
        
        let temp = data.get('sensor1').queue.data;
        if(self.chart.data.datasets[0].data.length >= data.get('sensor1').queue.maxSize)
          self.chart.data.datasets[0].data.shift();
        self.chart.data.datasets[0].data.push(temp[temp.length-1])
        self.chart.update()
      }
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render(){

    return (
      <Line data={data} options={options} ref="chart"></Line>
      // <div>
      //   {/* <p>count: {data.get('sensor1') && data.get('sensor1').queue.data.length}</p> */}
      //   {
          
      //     data && keys && keys.filter(key=>key ==='sensor1').map(key =>
      //       <div key={key}>
      //         {/* <p>min: {data.get('sensor1').minHeap.data[0]} | max: {data.get('sensor1').maxHeap.data[0]}</p> */}
      //         <ReactHighcharts isPureConfig config={config} ref="chart"></ReactHighcharts>
      //       </div>
      //     )
      //   }
      // </div>
    )
  }
}

export default MyHighchartsChart;