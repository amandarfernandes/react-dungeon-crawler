import React from 'react';

const Header = ({ level }) => {
  return (
    <div className="header">
      <h1>
        Dungeon Crawler <span>Level {level}</span>
      </h1>
    </div>
  );
};
export default Header;
