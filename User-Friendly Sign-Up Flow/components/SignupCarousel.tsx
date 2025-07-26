import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const carouselData = [
  {
    image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=800&fit=crop',
    title: 'Connect with your team',
    subtitle: 'Collaborate seamlessly with powerful tools designed for modern workflows'
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop',
    title: 'Boost productivity',
    subtitle: 'Streamline your processes and achieve more with intelligent automation'
  },
  {
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=800&fit=crop',
    title: 'Scale your business',
    subtitle: 'Grow confidently with enterprise-grade security and reliability'
  }
];

export function SignupCarousel() {
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