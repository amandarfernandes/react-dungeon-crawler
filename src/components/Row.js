import React from 'react';
import Cell from './Cell';

const Row = ({ row, rowIndex, playerPos, level, fogMode }) => {
  //current position of player;

  const [xPos, yPos] = playerPos;

  const xDistance = Math.abs(xPos - rowIndex);

  for (let col = 0; col < row.length; col++) {
    let yDistance = Math.abs(+yPos - col);
    let distance = xDistance + yDistance;
    if (distance > 10) {
      //if cell is further than 10 away hide cell to create fog effect
      row[col] = { ...row[col], distance, opacity: 0.02 };
    } else {
      row[col] = { ...row[col], distance, opacity: 1 };
    }
  }
  const columns = row.map((col, colIndex) => (
    <Cell key={'ci' + colIndex} cell={col} level={level} fogMode={fogMode} />
  ));
  return <div className="row">{columns}</div>;
};

export default Row;
