import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  Tag,
  Clock,
  Award,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  XCircle,
} from "lucide-react";
import { ThemeContext } from "../Provider/ThemeContext";
import { useContext } from "react";

const Toast = ({ message, type, isDark }) => {
  const bgColor =
    type === "success"
      ? isDark
        ? "bg-emerald-600"
        : "bg-green-500"
      : type === "error"
      ? isDark
        ? "bg-red-600"
        : "bg-red-500"
      : isDark
      ? "bg-gray-700"
      : "bg-gray-800";

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2`}
    >
      {type === "success" && <CheckCircle className="w-5 h-5" />}
      {type === "error" && <XCircle className="w-5 h-5" />}
      <span className="font-medium">{message}</span>
    </div>
  );
};

const Pricing = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem("enrolledCourses");
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setEnrolledCourses(parsedCart);
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:");
      }
    };

    loadCart();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const calculateSubtotal = () => {
    return enrolledCourses.reduce((sum, course) => sum + course.price, 0);
  };

  const calculateTotal = () => {
    const subtotal1 = calculateSubtotal();
    const subtotal2 = subtotal1 - discount;
    const subtotal = subtotal2.toFixed(2);
    return subtotal;
  };

  const handleRemoveCourse = (courseId) => {
    const updatedCourses = enrolledCourses.filter(
      (course) => course.id !== courseId
    );
    setEnrolledCourses(updatedCourses);
    const newSubtotal = updatedCourses.reduce(
      (sum, course) => sum + course.price,
      0
    );
    if (newSubtotal < 120 && discount > 0) {
      setDiscount(0);
      setPromoCode("");
      showToast(
        "Course removed. Promo code removed (order below $120)",
        "error"
      );
    } else {
      showToast("Course removed from cart", "success");
    }

    try {
      localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
    } catch (error) {
      console.error("Error updating cart in localStorage:");
    }
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      showToast("Please enter a promo code", "error");
      return;
    }

    const subtotal = calculateSubtotal();
    if (subtotal < 120) {
      showToast("Promo codes are only valid for orders over $120", "error");
      return;
    }

    const validCodes = {
      SAVE10: 10,
      SAVE20: 20,
      LEARN50: 50,
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      showToast(
        `Promo code applied! $${validCodes[promoCode.toUpperCase()]} off`,
        "success"
      );
    } else {
      showToast("Invalid promo code", "error");
    }
  };

  const handlePayNow = () => {
    if (enrolledCourses.length === 0) {
      showToast("Your cart is empty!", "error");
      return;
    }

    setEnrolledCourses([]);
    setDiscount(0);
    setPromoCode("");
    try {
      localStorage.removeItem("enrolledCourses");
    } catch (error) {
      console.error("Error clearing cart from localStorage:");
    }

    showToast("Payment successful! Enjoy your courses", "success");
  };

  const handleNavigateToCourses = () => {
    window.location.href = "/courses/";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {toast && (
        <Toast message={toast.message} type={toast.type} isDark={isDark} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={handleNavigateToCourses}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all mb-6 shadow-sm ${
            isDark
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div
            className={`p-3 rounded-xl ${
              isDark ? "bg-emerald-900/50" : "bg-blue-100"
            }`}
          >
            <ShoppingCart
              className={`w-8 h-8 ${
                isDark ? "text-emerald-400" : "text-blue-600"
              }`}
            />
          </div>
          <div>
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${
                isDark
                  ? "from-emerald-400 to-cyan-400"
                  : "from-blue-600 to-purple-600"
              } text-transparent bg-clip-text`}
            >
              Your Cart
            </h1>
            <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {enrolledCourses.length}{" "}
              {enrolledCourses.length === 1 ? "course" : "courses"} ready to
              checkout
            </p>
          </div>
        </div>

        {enrolledCourses.length === 0 ? (
          <div
            className={`rounded-2xl shadow-xl ${
              isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
            }`}
          >
            <div className="p-16 text-center">
              <div
                className={`p-8 rounded-full mb-6 inline-block ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <ShoppingCart
                  className={`w-16 h-16 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                />
              </div>
              <h2
                className={`text-2xl font-bold mb-2 ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Your cart is empty
              </h2>
              <p
                className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Explore our courses and start your learning journey!
              </p>
              <button
                onClick={handleNavigateToCourses}
                className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all shadow-lg ${
                  isDark
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <Sparkles className="w-5 h-5" />
                Browse Courses
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-4">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className={`rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    isDark
                      ? "bg-gray-800 border border-gray-700 hover:border-emerald-600"
                      : "bg-white border border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-full sm:w-32 h-32 rounded-lg overflow-hidden ring-2 ${
                            isDark ? "ring-gray-700" : "ring-blue-100"
                          }`}
                        >
                          <img
                            src={course.image}
                            alt={course.name}
                            className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3
                          className={`text-xl font-bold mb-2 transition-colors ${
                            isDark
                              ? "text-gray-100 hover:text-emerald-400"
                              : "text-gray-800 hover:text-blue-600"
                          }`}
                        >
                          {course.name}
                        </h3>
                        <p
                          className={`text-sm mb-3 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {course.description}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-4">
                          <div
                            className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${
                              isDark
                                ? "bg-gray-700 text-gray-300 border border-gray-600"
                                : "bg-gray-100 text-gray-700 border border-gray-200"
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            {course.duration}
                          </div>
                          <div
                            className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${
                              isDark
                                ? "bg-gray-700 text-gray-300 border border-gray-600"
                                : "bg-gray-100 text-gray-700 border border-gray-200"
                            }`}
                          >
                            <Award className="w-3 h-3" />
                            {course.level}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div
                            className={`text-2xl font-bold ${
                              isDark ? "text-emerald-400" : "text-green-600"
                            }`}
                          >
                            ${course.price}
                          </div>
                          <button
                            onClick={() => handleRemoveCourse(course.id)}
                            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                              isDark
                                ? "text-red-400 hover:bg-red-900/30"
                                : "text-red-600 hover:bg-red-50"
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div
                className={`rounded-xl shadow-xl sticky top-4 ${
                  isDark
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-blue-200"
                }`}
              >
                <div className="p-6">
                  <h2
                    className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                      isDark ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    <CreditCard
                      className={`w-6 h-6 ${
                        isDark ? "text-emerald-400" : "text-blue-600"
                      }`}
                    />
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div
                      className={`flex justify-between items-center py-3 border-b ${
                        isDark ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <span
                        className={isDark ? "text-gray-400" : "text-gray-600"}
                      >
                        Subtotal
                      </span>
                      <span
                        className={`font-semibold text-lg ${
                          isDark ? "text-gray-100" : "text-gray-800"
                        }`}
                      >
                        ${calculateSubtotal()}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div
                        className={`flex justify-between items-center py-3 border-b ${
                          isDark ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        <span
                          className={`flex items-center gap-2 ${
                            isDark ? "text-emerald-400" : "text-green-600"
                          }`}
                        >
                          <Tag className="w-4 h-4" />
                          Discount
                        </span>
                        <span
                          className={`font-semibold text-lg ${
                            isDark ? "text-emerald-400" : "text-green-600"
                          }`}
                        >
                          -${discount}
                        </span>
                      </div>
                    )}

                    <div
                      className={`flex justify-between items-center py-3 pt-4 border-t-2 ${
                        isDark ? "border-emerald-600" : "border-blue-200"
                      }`}
                    >
                      <span
                        className={`text-xl font-bold ${
                          isDark ? "text-gray-100" : "text-gray-800"
                        }`}
                      >
                        Total
                      </span>
                      <span
                        className={`text-3xl font-bold ${
                          isDark ? "text-emerald-400" : "text-blue-600"
                        }`}
                      >
                        ${calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <label
                        className={`block text-sm font-semibold mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Have a promo code?
                      </label>
                      <div className="flex gap-2 flex-col md:flex-row ">
                        <input
                          type="text"
                          placeholder="Enter code"
                          className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-emerald-500 focus:border-emerald-500"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-transparent"
                          }`}
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleApplyPromo()
                          }
                        />
                        <button
                          onClick={handleApplyPromo}
                          className={`flex justify-center px-6 py-2 font-semibold rounded-lg transition-colors  ${
                            isDark
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    {discount === 0 && (
                      <div
                        className={`rounded-lg p-3 border ${
                          isDark
                            ? "bg-emerald-900/20 border-emerald-700"
                            : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <p
                          className={`text-xs font-medium ${
                            isDark ? "text-emerald-400" : "text-blue-700"
                          }`}
                        >
                          Try: SAVE10, SAVE20, or LEARN50
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handlePayNow}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-bold text-lg rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl ${
                      isDark
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Pay Now
                  </button>

                  <div className="mt-6 space-y-2">
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <CheckCircle
                        className={`w-4 h-4 ${
                          isDark ? "text-emerald-500" : "text-green-600"
                        }`}
                      />
                      <span>Secure payment</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <CheckCircle
                        className={`w-4 h-4 ${
                          isDark ? "text-emerald-500" : "text-green-600"
                        }`}
                      />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <CheckCircle
                        className={`w-4 h-4 ${
                          isDark ? "text-emerald-500" : "text-green-600"
                        }`}
                      />
                      <span>Lifetime access to courses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
