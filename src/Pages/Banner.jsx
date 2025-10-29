import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { ThemeContext } from "../Provider/ThemeContext";

const TypingText = ({ text, speed = 100, className = "", wordPause = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const currentChar = text[currentIndex];
      const prevChar = currentIndex > 0 ? text[currentIndex - 1] : "";
      const delay = prevChar === " " && wordPause > 0 ? wordPause : speed;

      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentChar);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, wordPause]);

  return <span className={className}>{displayedText}</span>;
};

const Banner = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const descriptionText =
    "Learn programming from industry experts. Build real-world projects and advance your career with our comprehensive coding courses.";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-relaxed min-h-[200px] sm:min-h-[250px] ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <TypingText
              text="Master "
              speed={80}
              wordPause={300}
              className="inline-block"
            />{" "}
            <span
              className={`bg-gradient-to-r ${
                isDark
                  ? "from-blue-400 via-purple-500 to-pink-500"
                  : "from-blue-600 via-purple-600 to-pink-600"
              } bg-clip-text text-transparent`}
            >
              <TypingText
                text="in "
                speed={80}
                wordPause={300}
                className="inline-block"
              />{" "}
            </span>
            <span
              className={`bg-gradient-to-r ${
                isDark
                  ? "from-blue-400 via-purple-500 to-pink-500"
                  : "from-blue-600 via-purple-600 to-pink-600"
              } bg-clip-text text-transparent`}
            >
              <TypingText text="Coding" speed={150} className="inline-block" />
            </span>
            <TypingText text=" Skills" speed={150} className="inline-block" />
          </h1>
          <p
            className={`text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 min-h-[100px] ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <TypingText text={descriptionText} speed={30} />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button
              className={`px-8 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-gradient-to-r from-blue-600 to-purple-700 text-white"
              }`}
            >
              Explore Courses
            </button>
            <button
              className={`px-8 py-3 border-2 font-semibold rounded-lg transition-all duration-300 ${
                isDark
                  ? "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  : "border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white"
              }`}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 80,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full py-12 pb-16"
          >
            {data &&
              data.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center"
                  style={{ width: "300px", height: "auto" }}
                >
                  <div className="relative w-full max-w-[300px]">
                    <div
                      className={`aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ${
                        isDark ? "ring-2 ring-gray-700" : "ring-2 ring-gray-200"
                      }`}
                    >
                      <img
                        src={item.image || item.img || item.thumbnail}
                        alt={item.name || item.title || `Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center px-2">
                      <h3
                        className={`font-bold text-lg sm:text-xl mb-1 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.name || item.title || `Instructor ${index + 1}`}
                      </h3>
                      <p
                        className={`text-sm sm:text-base ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {item.expertise || "Expert Instructor"}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: ${isDark ? "rgb(168, 85, 247)" : "rgb(147, 51, 234)"};
          opacity: 0.7;
        }
        
        .swiper-pagination-bullet-active {
          background: ${isDark ? "rgb(168, 85, 247)" : "rgb(147, 51, 234)"};
          opacity: 1;
        }
        
        .swiper-slide {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Banner;