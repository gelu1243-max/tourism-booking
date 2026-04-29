import { useState, useEffect } from 'react';
import "./dashboard.css";               
const AutoSlider = () => {
  const images = ["/landingimage/📍Sof Omar Caves, Ethiopia.jpg", 
    "/landingimage/download (2).jpg",
    "/landingimage/download (3).jpg",
    "/landingimage/Erta Ale, Ethiopia - Unreal Volcanic Landscape in Ethiopia.jpg",
    "/components/landingimage/The Danakil Depression, Ethiopia’s Fiery Frontier 🇪🇹.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [images.length]);

  return (
    <header className="slider-container">
      <img className="slider-image" src={images[index]} alt="slideshow" />
    </header>
  );
};
export default AutoSlider;