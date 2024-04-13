import { Component, Input } from '@angular/core';
import { GridService } from '../grid.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.less'
})
export class TileComponent {
  @Input() rowIndex : number = 0
  @Input() columnIndex : number = 0
  @Input() numRows : number = 0
  @Input() numColumns : number = 0
  isBlock = false;
  isStart = false;
  isDestination = false;
  isVisited = false;
  isGoldenPath = false;
  neighbors: {row: number, col: number}[] = [];
  hCost = 0;
  gCost = Infinity;
  fCost = Infinity;

  constructor(private _gridService:GridService){

  }

  ngOnInit(){
    this.neighbors = this.calculateNeighbors(this.rowIndex,this.columnIndex,this.numRows,this.numColumns)
  }
  clicked(){
    this.setIsBlock(this._gridService.setBlock);
    this.setIsStart(this._gridService.setStart);
    this.setIsDestination(this._gridService.setDestination);

  }
  calculateNeighbors(rowIndex: number, colIndex: number, numRows: number, numCols: number): {row: number, col: number}[] {
    const neighbors: {row: number, col: number}[] = [];

    // Define directions (up, down, left, right)
    const directions = [
        {row: -1, col: 0}, // Up
        {row: 1, col: 0},  // Down
        {row: 0, col: -1}, // Left
        {row: 0, col: 1}   // Right
    ];

    // Iterate through directions to find neighbors
    for (const dir of directions) {
        const newRow = parseInt(rowIndex.toString()) + parseInt(dir.row.toString());
        const newCol = parseInt(colIndex.toString()) + parseInt(dir.col.toString());

        // Check if the new row and column indices are within bounds
        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
            neighbors.push({row: newRow, col: newCol});
        }
    }

    return neighbors;
}

  setIsBlock(value:boolean = false){
    this.isBlock = value;
  }
  setIsStart(value:boolean = false){
    this.isStart = value;
  }
  setIsDestination(value:boolean = false){
    this.isDestination = value
  }
  setIsVisited(value:boolean = false){
    this.isVisited = value
  }

  setShortestPath(){
    if(!this.isStart && !this.isBlock && !this.isDestination){
      this.isGoldenPath = true
      this.isVisited = false
    }
  }

}
