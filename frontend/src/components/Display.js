import React from 'react';

const Display = () => {
  const imageUrl = 'http://localhost:5000/captured_image.jpg'

  return (
    <div>
      <h2>Image Display</h2>
      <img className='ml-3' src={imageUrl} alt="Fetched" />
    </div>
  );
};

export default Display;