import { useState, useRef } from 'react';
import clsx from 'clsx';

interface GalleryProps {
  images: string[];
  index?: number;
  className?: string;
}

const Gallery = ({ images, index, className }: GalleryProps) => {

  const [currentIndex, setCurrentIndex] = useState(index ?? 0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [isMultiTouch, setIsMultiTouch] = useState(false);
  const containerRef = useRef(null);


  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto h-96 flex items-center justify-center text-gray-400">
        No images to display
      </div>
    );
  }
  

  const handleTouchStart = (e: any) => {
    if (e.touches.length > 1) {
      setIsMultiTouch(true);
      setDragStart(null);
      return;
    }

    setIsMultiTouch(false);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    if (e.touches.length > 1) {
      setIsMultiTouch(true);
      setDragStart(null);
    }
  };

  const handleTouchEnd = (e: any) => {
    if (isMultiTouch) {
      setIsMultiTouch(false);
      return;
    }

    if (!dragStart) return;

    const dragEnd = e.changedTouches[0].clientX;
    const delta = dragEnd - dragStart;

    if (Math.abs(delta) > 50) { // Minimum drag distance for swipe
      if (delta > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (delta < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setDragStart(null);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className={clsx("relative mx-auto", className)}>
      {/* Main image container */}
      <div
        ref={containerRef}
        className="mt-10 md:mt-0 h-[64vh] overflow-hidden dark:bg-darkBg flex"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >

        <img
          src={images[currentIndex]}
          alt={`${currentIndex}`}
          className={`w-full h-full object-contain transition-transform duration-300 cursor-pointer shrink-0`}
        />


      </div>

      {/* Thumbnail strip */}
      <div className="hidden md:flex justify-center gap-2 mt-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-16 overflow-hidden rounded-lg transition-opacity
              ${index === currentIndex ? 'ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'}`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-8 right-8 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Gallery;