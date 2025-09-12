import React, { useState } from 'react';

const ads = [
  { id: 1, image: 'https://via.placeholder.com/300x100?text=Ad+1', link: '#' },
  { id: 2, image: 'https://via.placeholder.com/300x100?text=Ad+2', link: '#' },
];

const MockAdsCarousel = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % ads.length);
  const prev = () => setIndex((index - 1 + ads.length) % ads.length);

  return (
    <div>
      <h3>Advertisements</h3>
      <div>
        <button onClick={prev}>Prev</button>
        <a href={ads[index].link} target="_blank" rel="noopener noreferrer">
          <img src={ads[index].image} alt={`Ad ${ads[index].id}`} />
        </a>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default MockAdsCarousel;
