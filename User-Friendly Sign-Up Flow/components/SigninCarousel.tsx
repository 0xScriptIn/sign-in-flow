import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const carouselData = [
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop',
    title: 'Welcome back!',
    subtitle: 'We\'re glad to see you again. Pick up right where you left off.'
  },
  {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=800&fit=crop',
    title: 'Your workspace awaits',
    subtitle: 'All your projects, files, and collaborations are ready for you.'
  },
  {
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=800&fit=crop',
    title: 'Stay connected',
    subtitle: 'Keep in touch with your team and never miss important updates.'
  }
];

export function SigninCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-white max-w-lg mx-auto">
      <div className="mb-8 relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselData.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="mb-4 text-white">{carouselData[currentIndex].title}</h1>
        <p className="text-blue-100 text-lg">
          {carouselData[currentIndex].subtitle}
        </p>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}