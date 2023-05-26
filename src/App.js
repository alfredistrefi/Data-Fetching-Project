import React, { useState, useEffect } from 'react';

import './ImageGallery.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [grayscale, setGrayscale] = useState(true);
  const [loading, setLoading] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);

  useEffect(() => {
    fetchPhotos(4);
  }, []);

  const fetchPhotos = (count) => {
    setLoading(true);
    setPhotoCount(count);

    const size = '800/600';

    fetch(`https://picsum.photos/v2/list?orientation=landscape&size=${size}`)
      .then((response) => response.json())
      .then((data) => {
        const randomPhotos = getRandomElements(data, count);
        setPhotos(randomPhotos);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const loadMorePhotos = () => {
    setLoading(true);

    const size = '800/600';

    fetch(`https://picsum.photos/v2/list?orientation=landscape&size=${size}`)
      .then((response) => response.json())
      .then((data) => {
        const randomPhotos = getRandomElements(data, 4);
        setPhotos((prevPhotos) => [...prevPhotos, ...randomPhotos]);
        setPhotoCount((prevCount) => prevCount + 4);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const getRandomElements = (arr, num) => {
    const shuffled = arr.sort(() => 0.3 - Math.random());
    return shuffled.slice(0, num);
  };

  const toggleGrayscale = () => {
    setGrayscale(!grayscale);
  };

  return (
    <div className="container">
      <div className="button-wrapper">
        <input type="checkbox" id="switch" checked={grayscale} onChange={toggleGrayscale} />
        <label htmlFor="switch">Toggle</label>
        <button className="button2" onClick={() => fetchPhotos(4)}>
          Fetch New Photos
        </button>
      </div>

      <div className={`image-gallery ${grayscale ? 'grayscale' : ''}`}>
        {/* Display skeleton loading indicator while waiting for images */}
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <>
            {photos.map((photo, index) => (
              <div key={index} className="image-wrapper">
              <img
    src={photo.download_url}
    alt={`Image ${index + 1}`}
    className="image"
    style={{ filter: grayscale ? 'grayscale(100%)' : 'none' }}
  />
  <div className="caption">{photo.author}</div>
 
      </div>
            ))}
          </>
        )}
      </div>

      <button className="button3" onClick={loadMorePhotos}>
        Load More
      </button>
    </div>
  );
};

export default App;
