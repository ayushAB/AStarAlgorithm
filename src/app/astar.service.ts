import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AstarService {
  private allNodes :any =[]; 
  constructor() { }

  setAllNodes(nodes:any) {
    this.allNodes = nodes
  }

  chebyshevDistance(currentNode:any, goalNode:any) {
    /*
    Calculate the Chebyshev distance between two nodes.
    
    Parameters:
        currentNode: Object {x, y} representing the coordinates of the current node.
        goalNode: Object {x, y} representing the coordinates of the goal node.
    
    Returns:
        The Chebyshev distance between the current node and the goal node.
    */
    // Calculate the absolute differences in x and y coordinates
    const dx = Math.abs(currentNode.x - goalNode.x);
    const dy = Math.abs(currentNode.y - goalNode.y);
    
    // Calculate the Chebyshev distance
    return Math.max(dx, dy);
}
  distance(currentNode:any,goalNode:any){
    let deltaX = Math.abs(currentNode.x - goalNode.x)
    let deltaY = Math.abs(currentNode.y - goalNode.y)
    return Math.sqrt(deltaX^2 + deltaY^2)
  }
  Astar(startNode:any,goalNode:any){
    let openList :any = [startNode]
    let closedList :any = [];
    startNode.gCost = 0;
    startNode.hCost = this.chebyshevDistance(startNode,goalNode);
    startNode.fCost = startNode.gCost + startNode.hCost;
    startNode.parent = null;
    let currentNode:any= null
    while(openList.length !=0) {
      currentNode = this.findTheLowestFcostNode(openList);
      let node = this.removeNode(openList,currentNode);
      closedList.push(node);
      if(currentNode.isDestination){
        // Path has been found;
        return this.constructPath(startNode,goalNode);
      }
      let tentativeGCost = 0;
      currentNode.neighbors.forEach((element:any) => {
        let neighbor:any = undefined;
        neighbor = this.allNodes.find((x:any) => (x.rowIndex == element.row && x.columnIndex == element.col))
        if (neighbor.isStart) {
          return; // Skip processing the startNode as its parent should remain null
      }
        let isNeighbourAlreadyVisited =  closedList.find((x:any) => element.row == x.rowIndex && element.col == x.columnIndex)
        if(isNeighbourAlreadyVisited || neighbor.isBlock){
          return;
        }
        tentativeGCost = currentNode.gCost + this.distance(currentNode,element);
        let InOpenList = openList.find((x:any) => (x.rowIndex == element.row && x.columnIndex == element.col) && !x.isStart)
        if(!InOpenList || tentativeGCost < neighbor.gCost){
          neighbor.gCost = tentativeGCost;
          neighbor.hCost = this.chebyshevDistance(neighbor,goalNode);
          neighbor.fCost = neighbor.gCost + neighbor.hCost;
          neighbor.parent = currentNode;
        }
        if(!InOpenList){
          openList.push(neighbor)
          if(!neighbor.isDestination)
           {  setTimeout(() => {
            neighbor.setIsVisited(true);
          },1000)
        }
        }
      });
    }
  }

  constructPath(startNode :any,goalNode:any){
    let path:any = []
    let currentNode = goalNode;
    while(currentNode != null){
      path.push(currentNode)
      currentNode = currentNode.parent
    }
    return path;
  }

  findTheLowestFcostNode(openList:any){
    if (openList.length === 0) {
      return null;
  }
   return  openList.reduce((lowest:any, current:any) => {
      return current.fCost < lowest.fCost ? current : lowest;
  });
  }

  removeNode(openList:any,currentNode:any){
    let indexToRemove = openList.findIndex((obj:any) => (obj.rowIndex == currentNode.rowIndex && obj.columnIndex == currentNode.columnIndex));

    if (indexToRemove !== -1) {
       return openList.splice(indexToRemove, 1)[0];
      }
  }
}
