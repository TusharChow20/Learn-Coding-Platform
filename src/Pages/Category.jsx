import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const categoryIcons = {
  "Web Development": "💻",
  "Graphic Design": "🎨",
  "UI/UX Design": "🎭",
  "Mobile App Development": "📱",
  "Data Science & AI": "🤖",
  Cybersecurity: "🔒",
};

const categoryColors = {
  "Web Development": "from-pink-500 to-pink-600",
  "Graphic Design": "from-red-500 to-orange-500",
  "UI/UX Design": "from-purple-500 to-purple-600",
  "Mobile App Development": "from-blue-500 to-blue-600",
  "Data Science & AI": "from-indigo-500 to-purple-500",
  Cybersecurity: "from-green-500 to-teal-500",
};

const CategorySlider = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/courses?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="mt-6 mb-8 font-bold text-3xl md:text-4xl lg:text-5xl text-base-content">
          Categories
        </h1>

        <div className="relative">
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            className="py-4 px-2"
          >
            {categories &&
              categories.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    onClick={() => handleCategoryClick(item.category)}
                    className="bg-base-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group hover:-translate-y-2 border border-base-300"
                  >
                    <div
                      className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br ${
                        categoryColors[item.category] ||
                        "from-blue-500 to-blue-600"
                      } flex items-center justify-center text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      {categoryIcons[item.category] || "📚"}
                    </div>

                    <h3 className="text-center font-bold text-base lg:text-lg mb-2 text-base-content min-h-[48px] lg:min-h-[56px] flex items-center justify-center px-2">
                      {item.category}
                    </h3>

                    <p className="text-center text-base-content/60 text-sm">
                      {item.courses?.length || 0} Courses
                    </p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
