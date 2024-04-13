import { Component, QueryList, ViewChildren } from '@angular/core';
import { TileComponent } from './tile/tile.component';
import { GridService } from './grid.service';
import { AstarService } from './astar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  rows : Array<number>;
  columns : Array<number>;
  @ViewChildren(TileComponent)
  tileComponents!: QueryList<TileComponent>;
  tileComponentArray: TileComponent[];
  numberOfRows = 50;
  numberOfColumns = 50;
  nodes : any = [];
  finalPath :any = [];
  startNode : any 
  destinationNode :any
  constructor(public _gridService:GridService , private _aStarService:AstarService){
    this.rows = Array(this.numberOfRows ).fill(0).map((x,i)=>i);
    this.columns = Array(this.numberOfColumns).fill(0).map((x,i)=>i);
    this.tileComponentArray = [];
  }
  ngAfterViewInit() {
    this.tileComponentArray = this.tileComponents.toArray();
  }
  ngOnInit(): void {
  }

  startPathFinding(){
    this.nodes = this.tileComponentArray;
    this._aStarService.setAllNodes(this.nodes);
    this.startNode = this.tileComponentArray.find(x => x.isStart)
    this.destinationNode =  this.tileComponentArray.find(x=> x.isDestination)
    this.finalPath = this._aStarService.Astar(this.startNode,this.destinationNode)
    if(this.finalPath && this.finalPath.length>0){
      this.finalPath.forEach((element:any) => {
        setTimeout(()=>{
          element.setShortestPath()
        },1000)
      });
    }
  }
  setStart(){
    this._gridService.setStartValue(true)
  }
  
  setDestination(){
    this._gridService.setDestinationValue(true)
  }
  
  setBlock(){
    this._gridService.setBlockValue(true)
  }

  refresh(){
     location.reload()
  }
}
