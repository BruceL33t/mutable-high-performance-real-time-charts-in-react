
import React from 'react';
import {reaction} from 'mobx';
import {observer, inject} from 'mobx-react';

const Boost = require("highcharts/modules/boost.js");
const ReactHighcharts = require('react-highcharts');
Boost(ReactHighcharts.Highcharts);

const config = {
  /* HighchartsConfig */
  chart: {
    animation: true,
    shadow: false,
  },
  xAxis: {
    type: 'datetime'
  },
  plotOptions: {
    series: {
      turboThreshold: 10000,
      boostThreshold: 1,
      marker: {
        enabled: false
      }
    },
    line: {
      animation: true
    }
  },
  boost: {
    enabled: true, // note: series / boostThreshold needs to be > 0 for this & useGPUTranslations to work
    useGPUTranslations: false, // doesn't work with addPoint and timeseries x axes
    seriesThreshold: 1,
    allowForce: true,
    //usePreallocated: true,
    // debug: {
    //   timeSetup: true,
    //   timeSeriesProcessing: true,
    // }
  },
  series: [{
    boostThreshold: 1,
    data: [],
  }]
};

@inject('store') @observer
class MyHighchartsChart extends React.Component {
  // since MobX observers forces re-render when observable properties are referenced this is useless
  // shouldComponentUpdate(){
  //   return false
  // }

  componentDidMount() {
    this.chart = this.refs.chart.getChart();  
    let self = this;
    let data = self.props.store.sensors;

    const reaction2 = reaction(
      () => data.get('sensor1').queue.modified,
      modified => {
        
        let temp = data.get('sensor1').queue.data;

          //let point = (temp[temp.length-1]);
          //self.chart.series[0].addPoint(point, false, self.chart.series[0].data.length>data.get('sensor1').n, false)

          // comment out the next line and comment in the 2 previous to use addPoint. Note, addPoint doesn't work with boost module, so disable that above.
          self.chart/*.update({series: [{data: temp}]})*/.series[0].setData(temp, false, false, false) 
          self.chart.redraw();
        
      }
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render(){

    return (
      <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
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