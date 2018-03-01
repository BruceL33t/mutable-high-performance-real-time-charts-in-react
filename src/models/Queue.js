import {observable} from 'mobx';

export default class Queue {
  @observable data;
  @observable modified; 
  
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.size = 0;
    this.data = [];
    this.head = -1;
    this.modified = 0;
  }
  
  add(measurement) {
    let removedItem = undefined;
    if(this.size >= this.maxSize) {
      let temp = this.data[0];
      removedItem = temp && temp.y ? temp.y+'' : undefined;
      this.data.shift();
    }
    
    this.data.push(measurement);
    
    if (removedItem === undefined && this.size < this.maxSize) {
      this.size++;
    }
    this.modified = + new Date();
    return removedItem;
  }
  
  get(i) {
    return this.data[i]
  }
}