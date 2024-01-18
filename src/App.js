// App.js
import React, { useState, useEffect, useRef } from 'react';
import {
  isPolygonConvex,
  isPointInsidePolygon,
  getCrossProduct,
} from './utils/geometryUtils';
import {
  drawPolygon,
  drawVertices,
  drawCheckPoint,
  clearCanvas,
} from './utils/canvasUtils';

const App = () => {
  const [numVertices, setNumVertices] = useState(0);
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
    clearCanvas(context, canvas.width, canvas.height);

    if (numVertices > 0 && vertices.length === numVertices) {
      drawPolygon(context, vertices);
      drawVertices(context, vertices);
      drawCheckPoint(context, pointToCheck, isInside);
    }
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
        max="30"
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
