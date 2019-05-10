const graph = {
  start: { A: 5, B: 2 },
  A: { C: 4, D: 2 },
  B: { A: 8, D: 7 },
  C: { D: 6, finish: 3 },
  D: { finish: 1 },
  finish: {}
};

// Find the “cheapest” node.
// Update the costs of the immediate neighbors of this node.
// Repeat steps 1 and 2 until you’ve done this for every node.
// Return the lowest cost to reach the node, and the optimal path to do so.
const shortestRoute = (graph) => {
  const trackingCosts = { finish: Infinity, ...graph.start }
  const trackingParent = { finish: null }
  //intially both A and B should be at start and finish should be null
  for (const keys in graph.start) {
    trackingParent[keys] = 'start'
  }

  const processedNodes = []
  //Our intial lowest node
  const node = lowestCostNode(trackingCosts, processedNodes)
  while (node) {
    //While loop will continuously look for lowestCostMpde

    // Cost of Reaching our current node from previous node
    const costOfReachingCurrentNode = trackingCosts[node]
    // Children of our current node 
    const currentNodeChildrens = graph[node]

    for (let childOfCurrentNode in currentNodeChildrens) {
      //Cost of reaching children of our current node
      const newCost = costOfReachingCurrentNode + currentNodeChildrens[childOfCurrentNode]

      // If our tracking cost does not contain children of our current node or if the cost of reaching the tracking parent children node is more than children of our current node 
      // Update our tracking costs to new cost and tracking parent to current node
      if (!trackingCosts[childOfCurrentNode] || trackingCosts[childOfCurrentNode] > newCost) {
        trackingCosts[childOfCurrentNode] = newCost
        trackingParent[childOfCurrentNode] = node
      }
    }

    //push the node B which we just processed in the processed node 
    processedNodes.push(node);

    //Again find the lowest node
    node = findLowestCostNode(trackedCosts, processedNodes)
  }


  let optimalPath = ['finish'];
  const parent = trackingParent.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = trackedParents[parent];
  }
  optimalPath = optimalPath.reverse();


  //Creating and returning our result 
  const results = {
    distance: trackingCosts.finish,
    path: optimalPath
  };

  return results;
}


// function that given the costs and the processed nodes, will return the cheapest node that hasn’t been processed.
const lowestCostNode = (trackingCosts, processed) => {
  return Object.keys(trackingCosts).reduce((lowest, node) => {
    //Intially infinity -> lowest
    //lowest A
    //B select 
    if (lowest === null || trackingCosts[node] < trackingCosts[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};

//Execution of function
console.log(shortestRoute(graph))