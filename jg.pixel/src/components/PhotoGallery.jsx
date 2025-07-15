import React from 'react';
import './PhotoGallery.css';

const PhotoGallery = ({ images }) => {
  return (
    <div className="photo-gallery">
      {images.map((image, index) => (
        <div key={index} className="photo-item">
          <img src={image.url} alt={image.alt} />
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
