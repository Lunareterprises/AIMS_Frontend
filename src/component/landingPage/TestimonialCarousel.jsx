import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";


const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("/data/LandingTestinomial.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Error fetching testimonials:", error));
  }, []);

  return (
    <div className="relative flex flex-col  bg-gray-800 text-white overflow-hidden px-28">
      <div className="container mx-auto px-4 py-16">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          className="w-full"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-between w-full">
                {/* Left section - Testimonial */}
                <div className="w-1/2 p-8">
                  <h1 className="text-4xl font-bold text-gray-300 mb-6">
                    Make the switch to the future
                    <br />
                    of business accounting
                  </h1>
                  <div className="border-b border-gray-700 py-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-24 h-20 rounded-lg overflow-hidden bg-blue-500">
                        <img src={testimonial.image} alt={testimonial.name} className=" object-cover" />
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
                  <div className="border-b border-gray-700 py-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-24 h-20 rounded-lg overflow-hidden bg-blue-500">
                        <img src={testimonial.image} alt={testimonial.name} className=" object-cover" />
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
                  <div className="border-b border-gray-700 py-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-24 h-20 rounded-lg overflow-hidden bg-blue-500">
                        <img src={testimonial.image} alt={testimonial.name} className=" object-cover" />
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
                <div className="w-1/2 flex items-center justify-center bg-black p-8">
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Dots */}
        <div className="flex items-center gap-2 justify-end mr-20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "w-16 bg-blue-500" : "w-2 bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
