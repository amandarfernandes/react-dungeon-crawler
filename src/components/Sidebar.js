import React from 'react';

const Sidebar = ({ player, dungeon, setFogMode, fogmode, message }) => {
  return (
    <div className="sidebar">
      <div className="settings">
        <div>
          <h4>Health:</h4>
          {player.health}
          <h4>XP:</h4>
          {player.xp}
        </div>
        <div>
          <h4>Weapon:</h4>
          {player.weapon.image}
          <h4>Damage:</h4>
          {player.weapon.damage}
        </div>
        <p className="toggle-switch">
          Fog Mode : <input type="checkbox" id="fogMode" checked={fogmode} onChange={setFogMode} />
          <label htmlFor="fogMode" />
        </p>
      </div>

      <div className="message">{message}</div>
    </div>
  );
};

export default Sidebar;
