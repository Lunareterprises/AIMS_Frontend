import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import profile from "../../../assets/avatar.jpg";

function SignLeftSide() {
  const testimonials = [
    {
      text: "BizFlow Books provides world-class services at a low price. We have seen a 30% increase in efficiency after moving to BizFlow Books.",
      name: "Abdurahman Chelathur",
      position: "COMMERCIAL MANAGER, NUBRA GLASS PLYWOODS AND HARDWARE",
      img: profile,
    },
    {
      text: "The best accounting solution we've ever used. Highly recommended!",
      name: "Sophia Williams",
      position: "FINANCIAL ADVISOR, TECHFIN SOLUTIONS",
      img: profile,
    },
    {
      text: "A seamless experience with great customer support. Saved us tons of time!",
      name: "John Doe",
      position: "CEO, SMART ACCOUNTS INC.",
      img: profile,
    },
  ];

  return (
    <div className=" rounded-4xl items-center justify-center flex bg-blue-600 text-white   w-full">
      <div className="w-full   justify-center p-5 ">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Trusted by <br /> businesses and CAs
        </h1>

        {/* Swiper Testimonial Box */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 }, // Mobile
            768: { slidesPerView: 1 }, // Tablet
            1024: { slidesPerView: 1 }, // Desktop
          }}
          className="w-full"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className=" w-full bg-blue-700 p-6 rounded-lg shadow-lg">
                <p className="text-lg italic mb-4">“{testimonial.text}”</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden mr-4">
                    <img
                      src={testimonial.img}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-xs">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Ratings Section */}
      {/* <div className="w-full md:w-3/5 flex flex-col justify-center items-center p-6 md:p-12">
        <p className="text-center font-medium text-lg mb-4">RATED BY THE BEST</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full max-w-md">
          {[
            { name: "Capterra", rating: "4.4/5" },
            { name: "G2", rating: "4.4/5" },
            { name: "Play Store", rating: "4.7/5" },
            { name: "App Store", rating: "4.8/5" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white text-black rounded px-3 py-2 flex items-center justify-center text-sm shadow-md"
            >
              <span className="mr-1 font-semibold">{item.name}</span>
              <span className="text-yellow-500">★★★★★</span>
              <span className="ml-1">{item.rating}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default SignLeftSide;
