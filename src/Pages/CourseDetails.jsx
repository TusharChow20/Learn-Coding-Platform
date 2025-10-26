import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Clock,
  Award,
  DollarSign,
  User,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  Star,
} from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await fetch("/allCourses.json");
        const coursesData = await coursesResponse.json();
        const selectedCourse = coursesData.find((c) => c.id === parseInt(id));

        const teachersResponse = await fetch("/teacherData.json");
        const teachersData = await teachersResponse.json();
        const selectedTeacher = teachersData.find(
          (t) => t.name === selectedCourse?.instructor
        );

        setCourse(selectedCourse);
        setTeacher(selectedTeacher);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <button
            onClick={() => navigate("/courses")}
            className="btn btn-primary"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/courses")}
          className="btn btn-ghost btn-sm mb-4 sm:mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-200 shadow-xl overflow-hidden">
              <figure className="relative h-64 sm:h-80 lg:h-96">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="badge badge-primary badge-lg font-bold shadow-lg text-base sm:text-lg px-4 py-3">
                    ${course.price}
                  </div>
                </div>
              </figure>

              <div className="card-body p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                  {course.name}
                </h1>

                <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    <span>{course.instructor}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-base-content/80 mb-6">
                  {course.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      Introduction
                    </h2>
                    <div className="bg-base-300/50 rounded-lg p-4 sm:p-6">
                      <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
                        {course.introduction}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
                      Course Overview
                    </h2>
                    <div className="bg-base-300/50 rounded-lg p-4 sm:p-6">
                      <p className="text-sm sm:text-base text-base-content/80 leading-relaxed whitespace-pre-line">
                        {course.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-200 shadow-xl sticky top-4">
              <div className="card-body p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  Course Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-base-300">
                    <span className="text-sm sm:text-base text-base-content/70">
                      Price
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-success">
                      ${course.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-base-300">
                    <span className="text-sm sm:text-base text-base-content/70">
                      Duration
                    </span>
                    <span className="font-semibold text-sm sm:text-base">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-base-300">
                    <span className="text-sm sm:text-base text-base-content/70">
                      Level
                    </span>
                    <span className="font-semibold text-sm sm:text-base">
                      {course.level}
                    </span>
                  </div>
                </div>

                <button className="btn btn-primary btn-block btn-lg mb-4 hover:scale-105 transition-transform duration-200">
                  Enroll Now
                </button>
                <button className="btn btn-outline btn-block">
                  Add to Wishlist
                </button>

                {teacher && (
                  <div className="mt-6 pt-6 border-t border-base-300">
                    <h3 className="text-lg sm:text-xl font-bold mb-4">
                      Instructor
                    </h3>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="avatar">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={teacher.image || teacher.photo}
                            alt={teacher.name}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base sm:text-lg">
                          {teacher.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-primary font-medium mb-2">
                          {teacher.expertise || teacher.specialization}
                        </p>
                        {teacher.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 text-warning fill-warning" />
                            <span className="text-sm font-semibold">
                              {teacher.rating}
                            </span>
                            {teacher.students && (
                              <span className="text-xs text-base-content/60 ml-2">
                                ({teacher.students} students)
                              </span>
                            )}
                          </div>
                        )}
                        <p className="text-xs sm:text-sm text-base-content/70 line-clamp-3">
                          {teacher.bio || teacher.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
