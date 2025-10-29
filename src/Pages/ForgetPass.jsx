import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeContext";
import { Mail, ArrowLeft, Send, Sparkles } from "lucide-react";

const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    const emailValue = e.target.email.value;

    if (!emailValue) {
      toast.error("Please enter your email address", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);

    resetPassword(emailValue)
      .then(() => {
        setIsLoading(false);
        toast.success("Password reset email sent! Check your inbox.", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#10b981",
            color: "#fff",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10b981",
          },
        });
        setTimeout(() => {
          window.location.href = "https://mail.google.com";
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        let errorMessage = "Failed to send reset email";

        if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Too many attempts. Please try again later";
        } else {
          errorMessage = error.message;
        }

        toast.error(errorMessage, {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#ef4444",
            color: "#fff",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ef4444",
          },
        });
      });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"
          : "bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50"
      }`}
    >
      {/* Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: isDark ? "#1e293b" : "#fff",
            color: isDark ? "#fff" : "#000",
            fontWeight: "500",
          },
        }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ animationDuration: "6s" }}
        ></div>
      </div>

      <div
        className={`relative w-full max-w-md transition-all duration-500 ${
          isDark ? "bg-slate-800/50" : "bg-white/80"
        } backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border ${
          isDark ? "border-slate-700" : "border-purple-100"
        }`}
      >
        {/* Back Button */}
        <Link
          to="/login"
          className={`inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${
            isDark
              ? "text-slate-300 hover:text-purple-400"
              : "text-gray-600 hover:text-purple-600"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div
            className={`relative p-4 rounded-2xl ${
              isDark
                ? "bg-gradient-to-br from-purple-600 to-blue-600"
                : "bg-gradient-to-br from-purple-500 to-pink-500"
            } shadow-lg animate-bounce`}
            style={{ animationDuration: "3s" }}
          >
            <Mail className="w-8 h-8 text-white" />
            <div
              className="absolute inset-0 rounded-2xl bg-white/20 animate-ping"
              style={{ animationDuration: "2s" }}
            ></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Reset Password
          </h2>
          <p className={`${isDark ? "text-slate-400" : "text-gray-600"}`}>
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="relative group">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  isDark
                    ? "text-slate-400 group-hover:text-purple-400"
                    : "text-gray-400 group-hover:text-purple-500"
                }`}
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl transition-all duration-300 outline-none ${
                  isDark
                    ? "bg-slate-700/50 text-white border border-slate-600 focus:border-purple-500 focus:bg-slate-700"
                    : "bg-gray-50 text-gray-800 border border-gray-200 focus:border-purple-400 focus:bg-white"
                } focus:ring-2 focus:ring-purple-500/20`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              isDark
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            } shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Sending...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Reset Link
              </div>
            )}
          </button>
        </form>

        {/* Footer */}
        <div
          className={`text-center mt-8 p-4 rounded-lg ${
            isDark
              ? "bg-slate-700/30 border border-slate-600"
              : "bg-purple-50 border border-purple-100"
          }`}
        >
          <p
            className={`text-sm flex items-center justify-center gap-2 ${
              isDark ? "text-slate-300" : "text-gray-700"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Check your spam folder if you don't see the email
          </p>
        </div>

        <p
          className={`text-center mt-6 text-sm ${
            isDark ? "text-slate-400" : "text-gray-600"
          }`}
        >
          Remember your password?{" "}
          <Link
            to="/login"
            className={`font-semibold transition-colors ${
              isDark
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-700"
            }`}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
