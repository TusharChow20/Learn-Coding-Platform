import { useState, useContext, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit2,
  Save,
  X,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

export default function ProfileDashboard() {
  const { user, updateProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    joinDate: "",
    photoURL: "",
  });

  const [tempData, setTempData] = useState({ ...profileData });

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      const joinDate = user.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })
        : "Recently";

      setProfileData({
        displayName: user.displayName || "User",
        email: user.email || "",
        phone: user.phoneNumber || "",
        location: "",
        bio: "Passionate learner exploring the world of web development and programming.",
        joinDate: joinDate,
        photoURL: user.photoURL || "",
      });
      setLoading(false);
    }
  }, [user]);

  // Mock stats data
  const stats = [
    {
      icon: BookOpen,
      label: "Courses Enrolled",
      value: "12",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: "8",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: Clock,
      label: "Hours Learned",
      value: "156",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      icon: Award,
      label: "Certificates",
      value: "5",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
  ];

  // Mock achievements
  const achievements = [
    {
      title: "First Steps",
      description: "Completed your first course",
      date: "Feb 2024",
      icon: "🎯",
    },
    {
      title: "Speed Learner",
      description: "Completed 5 courses in a month",
      date: "Mar 2024",
      icon: "⚡",
    },
    {
      title: "Dedicated Student",
      description: "7 day learning streak",
      date: "Apr 2024",
      icon: "🔥",
    },
    {
      title: "Master Coder",
      description: "Completed advanced JavaScript",
      date: "May 2024",
      icon: "💻",
    },
  ];

  const handleEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      // Update Firebase Auth profile
      if (tempData.displayName !== user.displayName) {
        await updateProfile({
          displayName: tempData.displayName,
        });
      }

      // Update local state
      setProfileData({ ...tempData });
      setIsEditing(false);

      toast.success("Profile updated successfully!", {
        icon: "✅",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setTempData({ ...tempData, [field]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setIsUploading(true);

      // Convert to base64 for display (in production, upload to Firebase Storage)
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          // Update Firebase Auth profile with photo URL
          await updateProfile({
            photoURL: reader.result,
          });

          setProfileData({ ...profileData, photoURL: reader.result });
          setTempData({ ...tempData, photoURL: reader.result });
          setIsUploading(false);
          toast.success("Profile photo updated!");
        } catch (error) {
          console.error("Error uploading photo:", error);
          setIsUploading(false);
          toast.error("Failed to update photo");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getUserInitials = () => {
    const name = profileData.displayName || profileData.email;
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="card bg-base-100 shadow-xl mb-6 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary via-secondary to-accent"></div>

          <div className="card-body -mt-16">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="avatar placeholder">
                  <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full w-32 h-32 ring ring-base-100 ring-offset-base-100 ring-offset-2">
                    {profileData.photoURL ? (
                      <img
                        src={profileData.photoURL}
                        alt="Profile"
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-bold">
                        {getUserInitials()}
                      </span>
                    )}
                  </div>
                </div>

                <label
                  className={`absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary cursor-pointer ${
                    isUploading ? "loading" : ""
                  }`}
                >
                  {!isUploading && <Camera className="w-4 h-4" />}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold">
                  {profileData.displayName}
                </h1>
                <p className="text-base-content/70 flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {profileData.email}
                </p>
                <p className="text-sm text-base-content/60 mt-2">
                  Member since {profileData.joinDate}
                </p>
              </div>

              {/* Edit Button */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="btn btn-success gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn btn-ghost gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="btn btn-primary gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="card-body p-6">
                    <div
                      className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-base-content/70">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Information */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  <User className="w-6 h-6" />
                  Personal Information
                </h2>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Full Name
                      </span>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.displayName}
                        onChange={(e) =>
                          handleChange("displayName", e.target.value)
                        }
                        className="input input-bordered w-full"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                        <User className="w-5 h-5 text-base-content/50" />
                        <span>{profileData.displayName}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                      <Mail className="w-5 h-5 text-base-content/50" />
                      <span>{profileData.email}</span>
                      {user.emailVerified && (
                        <span className="badge badge-success badge-sm ml-auto">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Phone</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={tempData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter your phone"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                        <Phone className="w-5 h-5 text-base-content/50" />
                        <span>{profileData.phone || "Not provided"}</span>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Location</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.location}
                        onChange={(e) =>
                          handleChange("location", e.target.value)
                        }
                        className="input input-bordered w-full"
                        placeholder="Enter your location"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                        <MapPin className="w-5 h-5 text-base-content/50" />
                        <span>{profileData.location || "Not provided"}</span>
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Bio</span>
                    </label>
                    {isEditing ? (
                      <textarea
                        value={tempData.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                        className="textarea textarea-bordered h-24"
                        placeholder="Tell us about yourself"
                      />
                    ) : (
                      <div className="p-3 bg-base-200 rounded-lg">
                        <p className="text-sm">{profileData.bio}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Achievements & Progress */}
          <div className="space-y-6">
            {/* Learning Progress */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">
                  <Target className="w-5 h-5" />
                  Learning Progress
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Overall Progress
                      </span>
                      <span className="text-sm font-bold">67%</span>
                    </div>
                    <progress
                      className="progress progress-primary w-full"
                      value="67"
                      max="100"
                    ></progress>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">This Month</span>
                      <span className="text-sm font-bold">45%</span>
                    </div>
                    <progress
                      className="progress progress-secondary w-full"
                      value="45"
                      max="100"
                    ></progress>
                  </div>

                  <div className="divider"></div>

                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-success" />
                      <span className="font-medium">Current Streak</span>
                    </div>
                    <span className="text-2xl font-bold text-success">
                      7 days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">
                  <Award className="w-5 h-5" />
                  Recent Achievements
                </h2>

                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors duration-200"
                    >
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm">
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-base-content/70 line-clamp-1">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-base-content/50 mt-1">
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="btn btn-outline btn-sm w-full mt-4">
                  View All Achievements
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
