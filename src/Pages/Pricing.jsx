import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
} from "lucide-react";
import toast from "react-hot-toast";

const Pricing = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Load enrolled courses from localStorage
    const courses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
    setEnrolledCourses(courses);
  }, []);

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
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
    toast.success("Course removed from cart", {
      icon: "🗑️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleApplyPromo = () => {
    const validCodes = {
      SAVE10: 10,
      SAVE20: 20,
      LEARN50: 50,
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      toast.success(
        `Promo code applied! $${validCodes[promoCode.toUpperCase()]} off`,
        {
          icon: "🎉",
          style: {
            borderRadius: "10px",
            background: "#10b981",
            color: "#fff",
          },
        }
      );
    } else if (promoCode) {
      toast.error("Invalid promo code", {
        style: {
          borderRadius: "10px",
          background: "#ef4444",
          color: "#fff",
        },
      });
    }
  };

  const handlePayNow = () => {
    if (enrolledCourses.length === 0) {
      toast.error("Your cart is empty!", {
        icon: "🛒",
        style: {
          borderRadius: "10px",
          background: "#ef4444",
          color: "#fff",
        },
      });
      return;
    }

    // Clear the cart
    setEnrolledCourses([]);
    localStorage.removeItem("enrolledCourses");
    setDiscount(0);
    setPromoCode("");

    toast.success("Payment successful! Enjoy your courses 🎓", {
      duration: 4000,
      style: {
        borderRadius: "10px",
        background: "#10b981",
        color: "#fff",
      },
    });

    setTimeout(() => {
      navigate("/courses");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/courses")}
          className="btn btn-ghost btn-sm mb-6 gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-3 rounded-xl">
            <ShoppingCart className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Cart
            </h1>
            <p className="text-base-content/60 mt-1">
              {enrolledCourses.length}{" "}
              {enrolledCourses.length === 1 ? "course" : "courses"} ready to
              checkout
            </p>
          </div>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="card bg-base-200 shadow-2xl">
            <div className="card-body items-center text-center py-16">
              <div className="bg-base-300/50 p-8 rounded-full mb-6">
                <ShoppingCart className="w-16 h-16 text-base-content/30" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-base-content/60 mb-6">
                Explore our courses and start your learning journey!
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="btn btn-primary btn-lg gap-2"
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
                  className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-primary/30"
                >
                  <div className="card-body p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="avatar">
                        <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                          <img
                            src={course.image}
                            alt={course.name}
                            className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                          {course.name}
                        </h3>
                        <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="badge badge-outline gap-1">
                            <Clock className="w-3 h-3" />
                            {course.duration}
                          </div>
                          <div className="badge badge-outline gap-1">
                            <Award className="w-3 h-3" />
                            {course.level}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-success">
                            ${course.price}
                          </div>
                          <button
                            onClick={() => handleRemoveCourse(course.id)}
                            className="btn btn-ghost btn-sm text-error gap-2 hover:bg-error/10"
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
              <div className="card bg-base-200 shadow-2xl sticky top-4 border border-primary/20">
                <div className="card-body p-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-primary" />
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-base-300">
                      <span className="text-base-content/70">Subtotal</span>
                      <span className="font-semibold text-lg">
                        ${calculateSubtotal()}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between items-center py-3 border-b border-base-300">
                        <span className="text-success flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Discount
                        </span>
                        <span className="font-semibold text-success text-lg">
                          -${discount}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-3 pt-4 border-t-2 border-primary/30">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-3xl font-bold text-primary">
                        ${calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Have a promo code?
                        </span>
                      </label>
                      <div className="join w-full">
                        <input
                          type="text"
                          placeholder="Enter code"
                          className="input input-bordered join-item flex-1"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleApplyPromo()
                          }
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="btn btn-primary join-item"
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    {discount === 0 && (
                      <div className="bg-info/10 rounded-lg p-3">
                        <p className="text-xs text-info font-medium">
                          Try: SAVE10, SAVE20, or LEARN50
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handlePayNow}
                    className="btn btn-primary btn-lg btn-block gap-2 hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-primary/50"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Pay Now
                  </button>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Secure payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <CheckCircle className="w-4 h-4 text-success" />
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
