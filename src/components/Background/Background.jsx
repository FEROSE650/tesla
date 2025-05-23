import './Background.css'
import tesla from '../../Assets/tesla.mp4'
import image1 from '../../Assets/image1.png'
import image2 from '../../Assets/image2.png'
import image3 from '../../Assets/image3.png'
import React, { useEffect, useRef, useState } from 'react'

const images = [image1, image2, image3];

const Background = ({ playStatus, heroCount }) => {
  const [autoIndex, setAutoIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!playStatus) {
      intervalRef.current = setInterval(() => {
        setPrevIndex(autoIndex);
        setFade(true);
        setTimeout(() => {
          setAutoIndex(prev => (prev + 1) % images.length);
          setFade(false);
        }, 600); // match CSS transition duration
      }, 3500);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [playStatus, autoIndex]);

  let bgContent;
  if (playStatus) {
    bgContent = (
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={tesla} type="video/mp4" />
      </video>
    );
  } else {
    bgContent = (
      <div className="background-fade-wrapper">
        <img
          src={images[prevIndex]}
          className={`background-image${fade ? " fade-out" : ""}`}
          alt=""
          style={{ zIndex: 1 }}
        />
        <img
          src={images[autoIndex]}
          className={`background-image${fade ? " fade-in" : ""}`}
          alt=""
          style={{ zIndex: 2 }}
        />
      </div>
    );
  }

  return (
    <div className="background-wrapper">
      {bgContent}
      <div className="background-overlay"></div>
    </div>
  );
};

export default Background
