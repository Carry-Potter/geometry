
export const isPolygonConvex = (polygon) => {
    const numVertices = polygon.length;
    if (numVertices < 3) return false;
  
    let direction = 0;
    for (let i = 0; i < numVertices; i++) {
      const vertex1 = polygon[i];
      const vertex2 = polygon[(i + 1) % numVertices];
      const vertex3 = polygon[(i + 2) % numVertices];
  
      const crossProduct = getCrossProduct(vertex1, vertex2, vertex3);
  
      if (crossProduct !== 0) {
        if (direction === 0) {
          direction = crossProduct > 0 ? 1 : -1;
        } else if (direction !== (crossProduct > 0 ? 1 : -1)) {
          return false;
        }
      }
    }
  
    return true;
  };
  
  export const isPointInsidePolygon = (point, polygon) => {
    const numVertices = polygon.length;
    if (numVertices < 3) return false;
  
    let isInside = false;
    for (let i = 0, j = numVertices - 1; i < numVertices; j = i++) {
      const xi = polygon[i].X,
        yi = polygon[i].Y;
      const xj = polygon[j].X,
        yj = polygon[j].Y;
  
      const intersect =
        yi > point.Y !== yj > point.Y &&
        point.X < ((xj - xi) * (point.Y - yi)) / (yj - yi) + xi;
  
      if (intersect) {
        isInside = !isInside;
      }
    }
  
    return isInside;
  };
  
  export const getCrossProduct = (vertex1, vertex2, vertex3) => {
    const vector1 = { X: vertex2.X - vertex1.X, Y: vertex2.Y - vertex1.Y };
    const vector2 = { X: vertex3.X - vertex2.X, Y: vertex3.Y - vertex2.Y };
    return vector1.X * vector2.Y - vector1.Y * vector2.X;
  };
  