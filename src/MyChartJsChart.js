
import React from 'react';
import {reaction} from 'mobx';
import {observer} from 'mobx-react';
import {Line} from 'react-chartjs-2';


const MyHighchartsChart = observer(({sensors, initialData, options}) => {

  initialData.datasets[0].data = sensors.get('sensor1').queue.data.slice();
    
    return (
      <Line data={initialData} options={options} ref="chart"></Line>
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
  
});

export default MyHighchartsChart;