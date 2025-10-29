import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { Sun, Moon, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => console.error("Logout error:", error));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About Developer", path: "/about" },
    { name: "Pricing", path: "/pricing" },
  ];

  const getUserInitials = () => {
    if (!user?.displayName && !user?.email) return "U";
    const name = user.displayName || user.email;
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              Learn<span className="text-accent">Coding</span>
            </NavLink>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="nav-link px-4 py-2 rounded-lg font-medium"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle swap swap-rotate"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <>
                {/* Profile */}
                <button
                  onClick={() => navigate("/profile")}
                  className="btn btn-ghost btn-circle avatar placeholder group relative"
                  aria-label="View profile"
                >
                  <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full w-10 h-10 flex items-center justify-center font-semibold group-hover:scale-110 transition-transform duration-200">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm">{getUserInitials()}</span>
                    )}
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost gap-2 hover:bg-base-200 flex items-center"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
                <NavLink
                  to="/courses"
                  className="btn btn-primary hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  Enroll Now
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-ghost gap-2 hover:bg-base-200 flex items-center"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </NavLink>
                <NavLink
                  to="/courses"
                  className="btn btn-primary hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  Enroll Now
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-circle"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[40rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-base-100 border-t border-base-300">
          {user && (
            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-4 mb-3">
              <div className="flex items-center space-x-3 text-primary-content">
                <div className="avatar placeholder">
                  <div className="bg-base-100 text-primary rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <span>{getUserInitials()}</span>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs opacity-90 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="nav-link-mobile block px-4 py-3 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsMenuOpen(false);
                }}
                className="btn btn-ghost w-full justify-start gap-2 flex"
              >
                <User className="w-5 h-5" />
                My Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="btn btn-ghost w-full justify-start gap-2 flex"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
              <NavLink
                to="/courses"
                className="btn btn-primary w-full mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Enroll Now
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn btn-ghost w-full justify-start gap-2 flex"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
                Login
              </NavLink>
              <NavLink
                to="/courses"
                className="btn btn-primary w-full mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Enroll Now
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
