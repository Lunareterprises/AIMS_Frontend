import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      name: "TARUN KUMAR JAIN",
      position: "DIRECTOR",
      company: "CXW",
      quote: "User-friendly, comprehensive, and highly compliant",
      image: "/api/placeholder/240/240",
      logoUrl: "/api/placeholder/50/20"
    },
    {
      name: "SHAMAL NAMBOLAN",
      position: "DIRECTOR",
      company: "FRUITBAE",
      quote: "One accounting solution for multiple outlets",
      image: "/api/placeholder/240/240",
      logoUrl: "/api/placeholder/50/20"
    },
    {
      name: "ABDURAHMAN",
      position: "COMMERCIAL MANAGER",
      company: "NUBRA",
      quote: "End-to-end accounting and inventory management made simple",
      image: "/api/placeholder/240/240",
      logoUrl: "/api/placeholder/50/20"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex flex-none w-full transform transition-transform duration-700 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {/* Left section - Testimonial */}
              <div className="w-1/2 p-8">
                <h1 className="text-4xl font-bold text-gray-300 mb-6">
                  Make the switch to the future
                  <br />
                  of business accounting
                </h1>
                <div className="border-b border-gray-700 pb-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-blue-500">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xl font-semibold mb-2">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-2 text-gray-400">
                        <p>{testimonial.name}, {testimonial.position}</p>
                        <img src={testimonial.logoUrl} alt={testimonial.company} className="h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right section - Quote graphic */}
              <div className="w-1/2 flex items-center justify-center bg-gray-900 p-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-yellow-400">"</div>
                  <h2 className="text-5xl font-bold">
                    I TRUST
                    <br />
                    <span className="text-6xl">ZOHO BOOKS</span>
                    <br />
                    FOR MY
                    <br />
                    <span className="text-6xl">BUSINESS</span>
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center gap-2 justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? 'w-16 bg-blue-500' : 'w-2 bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {/* <button 
        onClick={goToPrevSlide} 
        className="absolute top-1/2 left-4 bg-blue-600 p-2 rounded-full transform -translate-y-1/2"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={goToNextSlide} 
        className="absolute top-1/2 right-4 bg-blue-600 p-2 rounded-full transform -translate-y-1/2"
      >
        <ChevronRight size={24} />
      </button> */}
    </div>
  );
};

export default TestimonialCarousel;
