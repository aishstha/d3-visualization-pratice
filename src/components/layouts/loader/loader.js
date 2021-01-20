import React from 'react';

const Loader = () => {
  const { innerWidth, innerHeight } = window;
  const style = {
    position: 'fixed',
    zIndex: 1,
  };

  const style2 = {
    background: '#000',
    opacity: '0.6',
    width: innerWidth,
    height: innerHeight,
    position: 'absolute',
  };
  const style3 = {
    fontSize: '50px',
    color: '#fff',
    position: 'absolute',
    left: innerWidth * 0.4,
    top: innerHeight * 0.4,
  };
  return (
    <div style={style}>
      <div style={style2} />
      <div style={style3} className="spinner-wave">
        <div className="wave1" />
        <div className="wave2" />
        <div className="wave3" />
        <div className="wave4" />
        {/* <div className="wave5" /> */}
      </div>
    </div>
  );
};

export default Loader;
