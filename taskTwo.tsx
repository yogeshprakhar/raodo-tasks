type Trip = [string, string];
type Shipment = {
  pickups: string[];
  dropPoints: string[];
};

function validateTrips(shipment: Shipment, trips: Trip[]): boolean {
  const { pickups, dropPoints } = shipment;

  const allPoints = new Set([...pickups, ...dropPoints]);
  const visitedPickups = new Set<string>();
  const visitedDrops = new Set<string>();
  const warehouses = new Set<string>();

  // First, collect all warehouses and visited points
  for (const [from, to] of trips) {
    if (pickups.includes(from)) {
      visitedPickups.add(from);
    }
    if (dropPoints.includes(to)) {
      visitedDrops.add(to);
    }
    if (!pickups.includes(from) && !dropPoints.includes(to)) {
      warehouses.add(to);
    }
  }

  // Check that all pickups and drop points are visited
  if (
    visitedPickups.size !== pickups.length ||
    visitedDrops.size !== dropPoints.length
  ) {
    return false;
  }

  // Ensure that there's a valid path from each pickup to a drop point
  const pointFlow = new Map<string, Set<string>>();

  for (const [from, to] of trips) {
    if (!pointFlow.has(from)) {
      pointFlow.set(from, new Set<string>());
    }
    pointFlow.get(from)!.add(to);
  }

  // Use BFS or DFS to ensure every pickup can reach a drop point
  function canReachDropPoint(start: string): boolean {
    const visited = new Set<string>();
    const queue: string[] = [start];

    while (queue.length > 0) {
      const point = queue.shift()!;
      if (dropPoints.includes(point)) {
        return true;
      }
      visited.add(point);

      if (pointFlow.has(point)) {
        for (const next of pointFlow.get(point)!) {
          if (!visited.has(next)) {
            queue.push(next);
          }
        }
      }
    }

    return false;
  }

  // Check reachability from each pickup point
  for (const pickup of pickups) {
    if (!canReachDropPoint(pickup)) {
      return false;
    }
  }

  return true;
}

// Example usage:
const shipment: Shipment = {
  pickups: ["A", "B"],
  dropPoints: ["C", "D"],
};

const validTrips: Trip[] = [
  ["A", "W"],
  ["B", "W"],
  ["W", "C"],
  ["W", "D"],
];

const invalidTrips: Trip[] = [
  ["A", "W1"],
  ["B", "W2"],
  ["W3", "C"],
  ["W4", "D"],
];

console.log(validateTrips(shipment, validTrips)); // should output: true
console.log(validateTrips(shipment, invalidTrips)); // should output: false
