import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [numVertices, setNumVertices] = useState(3);
  const [vertices, setVertices] = useState([]);
  const [pointToCheck, setPointToCheck] = useState({ X: 0, Y: 0 });
  const [result, setResult] = useState('');
  const [isInside, setIsInside] = useState(false);
  const [isConvex, setIsConvex] = useState(false);

  const canvasRef = useRef(null);

  const generateVertices = () => {
    const newVertices = Array.from({ length: numVertices }, () => ({ X: 0, Y: 0 }));
    setVertices(newVertices);
  };


  const runProgram = () => {
    console.log('Tacka za proveru:', pointToCheck);

    const isConvexPolygon = isPolygonConvex(vertices);
    setIsConvex(isConvexPolygon);
    console.log('Mnogougao je konveksan:', isConvexPolygon);

    const isInsidePolygon = isPointInsidePolygon(pointToCheck, vertices);
    setIsInside(isInsidePolygon);
    setResult(isInsidePolygon ? 'Tačka je unutar mnogougla.' : 'Tačka je van mnogougla.');

    
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Nacrtaj mnogougao
    if (numVertices > 0 && vertices.length === numVertices) {
      context.beginPath();
      context.moveTo(vertices[0].X, vertices[0].Y);
      for (let i = 1; i < numVertices; i++) {
        context.lineTo(vertices[i].X, vertices[i].Y);
      }
      context.closePath();
      context.stroke();

      // Nacrtaj sve tacke mnogougla
      context.fillStyle = 'blue';
      for (let i = 0; i < numVertices; i++) {
        context.beginPath();
        context.arc(vertices[i].X, vertices[i].Y, 3, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
      }

      // Nacrtaj tacku za proveru
      context.fillStyle = isInside ? 'green' : 'red';
      context.beginPath();
      context.arc(pointToCheck.X, pointToCheck.Y, 5, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
    }
  };

  const isPolygonConvex = (polygon) => {
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

  const isPointInsidePolygon = (point, polygon) => {
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

  const getCrossProduct = (vertex1, vertex2, vertex3) => {
    const vector1 = { X: vertex2.X - vertex1.X, Y: vertex2.Y - vertex1.Y };
    const vector2 = { X: vertex3.X - vertex2.X, Y: vertex3.Y - vertex2.Y };
    return vector1.X * vector2.Y - vector1.Y * vector2.X;
  };

  useEffect(() => {
    drawCanvas();
  }, [vertices, numVertices, pointToCheck, isInside, isConvex]);

  return (
    <div>
      <h1>Unesite broj temena mnogougla:</h1>
      <input
        type="number"
        value={numVertices}
        onChange={(e) => setNumVertices(parseInt(e.target.value))}
        placeholder="Broj temena mnogougla"
        min="1"
        max="100"
        required
      />    
       <button className ="btn2" onClick={generateVertices}><p>Generiši temena</p></button>

      <div>
        {vertices.map((vertex, index) => (
          <div key={index}>
            <label>{`X koordinata temena ${index + 1}:`}</label>
            <input
              type="number"
              value={vertex.X}
              onChange={(e) =>
                setVertices((prev) =>
                  prev.map((v, i) => (i === index ? { ...v, X: parseFloat(e.target.value) } : v))
                )
              }
              placeholder="X koordinata"
              min="0"
              max="500"
              required
            />

            <label>{`Y koordinata temena ${index + 1}:`}</label>
            <input
              type="number"
              value={vertex.Y}
              onChange={(e) =>
                setVertices((prev) =>
                  prev.map((v, i) => (i === index ? { ...v, Y: parseFloat(e.target.value) } : v))
                )
              }
              placeholder="Y koordinata"
              min="0"
              max="500"
              required
            />
          </div>
        ))}
      </div>

 
    

      <h1>Unesite koordinate tačke za proveru:</h1>
      <label>X koordinata:</label>
      <input
        type="number"
        value={pointToCheck.X}
        onChange={(e) => setPointToCheck({ ...pointToCheck, X: parseFloat(e.target.value) })}
        placeholder="X koordinata"
        min="0"
        max="500"
        required
      />

      <label>Y koordinata:</label>
      <input
        type="number"
        value={pointToCheck.Y}
        onChange={(e) => setPointToCheck({ ...pointToCheck, Y: parseFloat(e.target.value) })}
        placeholder="Y koordinata"
        min="0"
        max="500"
        required
      />

      <button className ="btn2" onClick={runProgram}><p>Pokreni program</p></button>

      <p>{result}</p>

      <p>Mnogougao je {isConvex ? 'konveksan' : 'konkavan'}.</p>

      <canvas ref={canvasRef} width="500" height="500" style={{ border: '1px solid #000' }}></canvas>
    </div>
  );
};

export default App;
