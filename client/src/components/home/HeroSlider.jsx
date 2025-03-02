import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slider data
  const slides = [
    {
      id: 1,
      title: 'Excellence in Education',
      subtitle: 'Shaping Minds, Building Futures',
      description: 'Join our institution for a transformative educational experience that prepares students for success in a global world.',
      image: 'https://source.unsplash.com/random/1920x1080/?school,students',
      cta: {
        text: 'Apply Now',
        link: '/admissions'
      }
    },
    {
      id: 2,
      title: 'Innovative Learning',
      subtitle: 'Beyond Textbooks',
      description: 'Our innovative teaching methods and modern facilities create an engaging learning environment for all students.',
      image: 'https://source.unsplash.com/random/1920x1080/?classroom,learning',
      cta: {
        text: 'Explore Programs',
        link: '/about'
      }
    },
    {
      id: 3,
      title: 'Vibrant Campus Life',
      subtitle: 'Growing Together',
      description: 'Experience a diverse and inclusive community with countless opportunities for personal and academic growth.',
      image: 'https://source.unsplash.com/random/1920x1080/?campus,college',
      cta: {
        text: 'View Gallery',
        link: '/gallery'
      }
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          currentSlide === index && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {/* Background image with overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
              </div>
              
              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-3xl text-white"
                  >
                    <h3 className="text-xl md:text-2xl font-medium mb-2 text-primary-400">
                      {slide.subtitle}
                    </h3>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 text-gray-200">
                      {slide.description}
                    </p>
                    <Link
                      to={slide.cta.link}
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      {slide.cta.text}
                      <FiArrowRight className="ml-2" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-primary-500 w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;