import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { ThemeContext } from "../../Provider/ThemeContext";

export default function Register() {
  const { createUser, signInWithGoogle, signInWithGitHub } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false,
  });

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const pwd = formData.password;
    setPasswordValidation({
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      match: pwd === formData.confirmPassword && pwd.length > 0,
    });
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true,
    });
  };

  const isPasswordValid = Object.values(passwordValidation).every((v) => v);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Please meet all password requirements");
      return;
    }

    const email = e.target.email.value;
    const password = e.target.password.value;

    setIsLoading(true);

    createUser(email, password)
      .then(() => {
        toast.success("Welcome! Your account has been created.", {
          duration: 3000,
          icon: "🎉",
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        let errorMessage = "Failed to create account";

        if (error.code === "auth/email-already-in-use") {
          errorMessage = "This email is already registered";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "Password is too weak";
        } else if (error.code === "auth/network-request-failed") {
          errorMessage = "Network error. Please check your connection";
        } else if (error.message) {
          errorMessage = error.message;
        }

        toast.error(errorMessage, {
          duration: 4000,
        });
      });
  };

  const handleGoogleSignIn = () => {
    const loadingToast = toast.loading("Connecting to Google...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    signInWithGoogle()
      .then(() => {
        toast.success("Welcome! Redirecting...", {
          id: loadingToast,
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
        toast.error(
          error.code === "auth/popup-closed-by-user"
            ? "Sign-in cancelled"
            : error.message || "Sign-in failed",
          {
            id: loadingToast,
            duration: 3000,
          }
        );
      });
  };
  const handleGitHubSignIn = () => {
    const loadingToast = toast.loading("Connecting to GitHub...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    signInWithGitHub()
      .then(() => {
        toast.success("Welcome! Redirecting...", {
          id: loadingToast,
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.error("GitHUb sign-in error:", error);
        toast.error(
          error.code === "auth/popup-closed-by-user"
            ? "Sign-in cancelled"
            : error.message || "Sign-in failed",
          {
            id: loadingToast,
            duration: 3000,
          }
        );
      });
  };

  const ValidationItem = ({ isValid, text }) => (
    <div
      className={`flex items-center gap-2 text-sm transition-all duration-300 ${
        isValid ? "text-green-500" : isDark ? "text-slate-400" : "text-gray-500"
      }`}
    >
      {isValid ? (
        <CheckCircle2 className="w-4 h-4 animate-scale-in" />
      ) : (
        <XCircle className="w-4 h-4 opacity-50" />
      )}
      <span>{text}</span>
    </div>
  );

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-950"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      {/* Toast Container */}
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          style: {
            background: isDark ? "#1e293b" : "#fff",
            color: isDark ? "#fff" : "#1e293b",
            border: isDark ? "1px solid #475569" : "1px solid #e5e7eb",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <style>{`
        @keyframes scale-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>

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
        <div className="flex justify-center mb-6">
          <div
            className={`relative p-4 rounded-2xl ${
              isDark
                ? "bg-gradient-to-br from-purple-600 to-blue-600"
                : "bg-gradient-to-br from-purple-500 to-pink-500"
            } shadow-lg animate-bounce`}
            style={{ animationDuration: "3s" }}
          >
            <Sparkles className="w-8 h-8 text-white" />
            <div
              className="absolute inset-0 rounded-2xl bg-white/20 animate-ping"
              style={{ animationDuration: "2s" }}
            ></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Create Account
          </h2>
          <p className={`${isDark ? "text-slate-400" : "text-gray-600"}`}>
            Join us and start your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  isDark
                    ? "text-slate-400 group-hover:text-purple-400"
                    : "text-gray-400 group-hover:text-purple-500"
                }`}
              />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl transition-all duration-300 outline-none ${
                  isDark
                    ? "bg-slate-700/50 text-white border border-slate-600 focus:border-purple-500 focus:bg-slate-700"
                    : "bg-gray-50 text-gray-800 border border-gray-200 focus:border-purple-400 focus:bg-white"
                } focus:ring-2 focus:ring-purple-500/20`}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

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
                value={formData.email}
                onChange={handleChange}
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

          <div className="relative group">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  isDark
                    ? "text-slate-400 group-hover:text-purple-400"
                    : "text-gray-400 group-hover:text-purple-500"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                className={`w-full pl-12 pr-12 py-3.5 rounded-xl transition-all duration-300 outline-none ${
                  isDark
                    ? "bg-slate-700/50 text-white border border-slate-600 focus:border-purple-500 focus:bg-slate-700"
                    : "bg-gray-50 text-gray-800 border border-gray-200 focus:border-purple-400 focus:bg-white"
                } focus:ring-2 focus:ring-purple-500/20`}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                  isDark
                    ? "text-slate-400 hover:text-purple-400"
                    : "text-gray-400 hover:text-purple-500"
                }`}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {touched.password && formData.password && !isPasswordValid && (
            <div
              className={`p-4 rounded-xl border ${
                isDark
                  ? "bg-slate-700/30 border-slate-600"
                  : "bg-gray-50 border-gray-200"
              } space-y-2 animate-scale-in`}
            >
              <p
                className={`text-sm font-medium mb-2 ${
                  isDark ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Password must contain:
              </p>
              <ValidationItem
                isValid={passwordValidation.length}
                text="At least 8 characters"
              />
              <ValidationItem
                isValid={passwordValidation.uppercase}
                text="One uppercase letter"
              />
              <ValidationItem
                isValid={passwordValidation.lowercase}
                text="One lowercase letter"
              />
              <ValidationItem
                isValid={passwordValidation.number}
                text="One number"
              />
              <ValidationItem
                isValid={passwordValidation.special}
                text="One special character"
              />
            </div>
          )}

          <div className="relative group">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  isDark
                    ? "text-slate-400 group-hover:text-purple-400"
                    : "text-gray-400 group-hover:text-purple-500"
                }`}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur("confirmPassword")}
                className={`w-full pl-12 pr-12 py-3.5 rounded-xl transition-all duration-300 outline-none ${
                  isDark
                    ? "bg-slate-700/50 text-white border border-slate-600 focus:border-purple-500 focus:bg-slate-700"
                    : "bg-gray-50 text-gray-800 border border-gray-200 focus:border-purple-400 focus:bg-white"
                } focus:ring-2 focus:ring-purple-500/20`}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                  isDark
                    ? "text-slate-400 hover:text-purple-400"
                    : "text-gray-400 hover:text-purple-500"
                }`}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {touched.confirmPassword && formData.confirmPassword && (
              <div
                className={`mt-2 flex items-center gap-2 text-sm ${
                  passwordValidation.match ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordValidation.match ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Passwords match</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    <span>Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>

          <label className="flex items-start cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 mt-1 rounded border-2 transition-all cursor-pointer"
              required
            />
            <span
              className={`ml-3 text-sm ${
                isDark ? "text-slate-300" : "text-gray-600"
              }`}
            >
              I agree to the{" "}
              <button
                type="button"
                className={`font-medium transition-colors ${
                  isDark
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-700"
                }`}
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className={`font-medium transition-colors ${
                  isDark
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-700"
                }`}
              >
                Privacy Policy
              </button>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading || !isPasswordValid}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              isDark
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            } shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div
            className={`absolute inset-0 flex items-center ${
              isDark ? "text-slate-600" : "text-gray-300"
            }`}
          >
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className={`px-4 ${
                isDark
                  ? "bg-slate-800/50 text-slate-400"
                  : "bg-white/80 text-gray-500"
              }`}
            >
              Or sign up with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleGoogleSignIn()}
            className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 cursor-pointer hover:scale-105 ${
              isDark
                ? "bg-slate-700/50 text-white border border-slate-600 hover:bg-slate-700"
                : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow"
            }`}
          >
            <svg
              className="w-5 h-5 mx-auto"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleGitHubSignIn}
            className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              isDark
                ? "bg-slate-700/50 text-white border border-slate-600 hover:bg-slate-700"
                : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow"
            }`}
          >
            <svg
              className="w-5 h-5 mx-auto"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </button>
        </div>

        <p
          className={`text-center mt-8 text-sm ${
            isDark ? "text-slate-400" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <NavLink
            to={"/login"}
            className={`font-semibold transition-colors ${
              isDark
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-700"
            }`}
          >
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}
