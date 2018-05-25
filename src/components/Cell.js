import React from 'react';

const Cell = ({ cell, level, fogMode }) => {
  return (
    <div
      style={{ opacity: fogMode ? cell.opacity : 1 }}
      className={cell.type === 'cell' ? `zone${level}` : `zone${level} ${cell.type}`}
    />
  );
};
export default Cell;
