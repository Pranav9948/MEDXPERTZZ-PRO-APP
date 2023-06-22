import React from 'react';
import '../styles/components/gif.css'
import gif from '../images/doctorGif.gif'

function Gif() {
  return (
    <div className="loader-container">
      <img src={gif} alt="Loading..." className="loader-gif" />
    </div>
  );
}

export default Gif;
