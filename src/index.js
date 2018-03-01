import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { types } from 'mobx-state-tree';
import { Provider, observer, inject } from 'mobx-react';
// import { connectReduxDevtools } from 'mst-middlewares'
import registerServiceWorker from './registerServiceWorker';
import MyChartJsChart from './MyChartJsChart';
import Sensor from './models/Sensor';

const initialData = {
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
      data: [],
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

const RootStore = types.model({
  sensorsCount: (types.number, 10),
  
})
.volatile(self => ({
  sensors: new Map(),
}))
.actions(self => ({
  afterCreate(){
    const sensorIds = ['sensor1', 'sensor2', 'sensor3','sensor4', 'sensor5', 'sensor6','sensor7', 'sensor8', 'sensor9', 'sensor10'];
    
    for(let sensor of sensorIds) {
      self.sensors.set(sensor, new Sensor(20));
    }
    
    setInterval(function(){ 
      let out = {};
      const x = + new Date()  // unix timestamp
      for(let sensor of sensorIds){
        const y = Math.floor(Math.random() * 1000) + 1  
        const m = {x: x, y: y}
        out[sensor] = m;
      }
      
      self.addMeasurement(out)
    }, 1000);
  },

  addMeasurement(incomingData) {
    const keys = [...self.sensors.keys()];

    if (keys.length === 0) {
      for (const key in incomingData) {
        // not implemented
      }
    } else {
      for (const key in incomingData) {
        
        if(keys.indexOf(key) > -1){
          self.sensors.get(key).add(incomingData[key]) 
        } else {
          // not implemented
        }
      }
    }
  }
}))

const store = RootStore.create({})

//connectReduxDevtools(require('remotedev'), store);
// unprotect(store);
window.store = store;

const history = {
  snapshots: observable.shallowArray(),
  actions: observable.shallowArray(),
  patches: observable.shallowArray()
};


@inject("store") @observer
class App extends React.Component {
  shouldComponentUpdate(){
    return false;
  }
  render(){
    return <MyChartJsChart sensors={store.sensors} initialData={initialData} options={options}/>
  }
}

ReactDOM.render(<Provider store={store} history={history}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
