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

const Toast = ({ message, type }) => {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
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
        console.error("Error loading cart from localStorage:", error);
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
    const subtotal = calculateSubtotal();
    return subtotal - discount;
  };

  const handleRemoveCourse = (courseId) => {
    const updatedCourses = enrolledCourses.filter(
      (course) => course.id !== courseId
    );
    setEnrolledCourses(updatedCourses);

    try {
      localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
    } catch (error) {
      console.error("Error updating cart in localStorage:", error);
    }

    showToast("Course removed from cart", "success");
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
      console.error("Error clearing cart from localStorage:", error);
    }

    showToast("Payment successful! Enjoy your courses", "success");
  };

  const handleNavigateToCourses = () => {
    window.location.href = "/courses/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-6 sm:py-8 lg:py-12">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={handleNavigateToCourses}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-all mb-6 shadow-sm border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 p-3 rounded-xl">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Your Cart
            </h1>
            <p className="text-gray-600 mt-1">
              {enrolledCourses.length}{" "}
              {enrolledCourses.length === 1 ? "course" : "courses"} ready to
              checkout
            </p>
          </div>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl">
            <div className="p-16 text-center">
              <div className="bg-gray-100 p-8 rounded-full mb-6 inline-block">
                <ShoppingCart className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Explore our courses and start your learning journey!
              </p>
              <button
                onClick={handleNavigateToCourses}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
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
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden ring-2 ring-blue-100">
                          <img
                            src={course.image}
                            alt={course.name}
                            className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
                          {course.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {course.description}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200">
                            <Clock className="w-3 h-3" />
                            {course.duration}
                          </div>
                          <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200">
                            <Award className="w-3 h-3" />
                            {course.level}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-green-600">
                            ${course.price}
                          </div>
                          <button
                            onClick={() => handleRemoveCourse(course.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
              <div className="bg-white rounded-xl shadow-xl sticky top-4 border border-blue-200">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-lg text-gray-800">
                        ${calculateSubtotal()}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-green-600 flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Discount
                        </span>
                        <span className="font-semibold text-green-600 text-lg">
                          -${discount}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-3 pt-4 border-t-2 border-blue-200">
                      <span className="text-xl font-bold text-gray-800">
                        Total
                      </span>
                      <span className="text-3xl font-bold text-blue-600">
                        ${calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Have a promo code?
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleApplyPromo()
                          }
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    {discount === 0 && (
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-xs text-blue-700 font-medium">
                          Try: SAVE10, SAVE20, or LEARN50
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handlePayNow}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Pay Now
                  </button>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Secure payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
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
