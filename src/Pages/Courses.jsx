import React, { useEffect, useState } from "react";
import { Clock, Award, DollarSign, User } from "lucide-react";
import { useNavigate } from "react-router";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/allCourses.json")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses =
    filter === "All"
      ? courses
      : courses.filter((course) => course.level.includes(filter));

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Courses
            </span>
          </h1>
          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto">
            Explore our comprehensive collection of courses designed to help you
            master new skills
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`btn btn-sm sm:btn-md ${
                filter === level ? "btn-primary" : "btn-outline"
              } transition-all duration-200`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="card bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <figure className="relative overflow-hidden h-48 sm:h-56">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <div className="badge badge-primary badge-lg font-semibold shadow-lg">
                    ${course.price}
                  </div>
                </div>
              </figure>

              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-base sm:text-lg lg:text-xl line-clamp-2 mb-2">
                  {course.name}
                </h2>

                <p className="text-xs sm:text-sm text-base-content/70 line-clamp-3 mb-3 sm:mb-4">
                  {course.description}
                </p>

                <div className="space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    <span className="text-base-content/80">
                      {course.instructor}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
                    <span className="text-base-content/80">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                    <span className="text-base-content/80">{course.level}</span>
                  </div>
                </div>

                <div className="card-actions justify-between items-center pt-3 sm:pt-4 border-t border-base-300">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                    <span className="text-lg sm:text-xl font-bold text-success">
                      {course.price}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/courseDetails/${course.id}`)}
                    className="btn btn-primary btn-sm sm:btn-md hover:scale-105 transition-transform duration-200"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-lg sm:text-xl text-base-content/60">
              No courses found for this level
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
