import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  setBlock : boolean = false
  setStart : boolean = false
  setDestination : boolean = false
  constructor() { }

  setBlockValue(value:boolean = false){
    this.setBlock = value;
    this.setDestination = false;
    this.setStart = false;
  }
  
  setStartValue(value:boolean = false){
    this.setBlock = false;
    this.setDestination = false;
    this.setStart = value;
  }
  
  setDestinationValue(value:boolean = false){
    this.setBlock = false;
    this.setDestination = value;
    this.setStart = false;
  }
}
