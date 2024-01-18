
export const drawPolygon = (context, vertices) => {
    if (!context || !vertices || vertices.length === 0) return;
  
    context.beginPath();
    context.moveTo(vertices[0].X, vertices[0].Y);
    for (let i = 1; i < vertices.length; i++) {
      context.lineTo(vertices[i].X, vertices[i].Y);
    }
    context.closePath();
    context.stroke();
  };
  
  export const drawVertices = (context, vertices) => {
    if (!context || !vertices || vertices.length === 0) return;
  
    context.fillStyle = 'blue';
    for (let i = 0; i < vertices.length; i++) {
      context.beginPath();
      context.arc(vertices[i].X, vertices[i].Y, 3, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
    }
  };
  
  export const drawCheckPoint = (context, point, isInside) => {
    if (!context || !point) return;
  
    context.fillStyle = isInside ? 'green' : 'red';
    context.beginPath();
    context.arc(point.X, point.Y, 5, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  };
  
  export const clearCanvas = (context, width, height) => {
    if (!context) return;
  
    context.clearRect(0, 0, width, height);
  };
  