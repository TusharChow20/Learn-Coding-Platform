<div align="center">

# 🎓 📚 Learn Coding Platform 📚 🎓

### *Your Gateway to Mastering Programming Skills* ✨

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-4A90E2?style=for-the-badge&labelColor=1a1a2e)](https://learn-coding-platform.web.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TusharChow20)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tusharchowdhury20211/)

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png" alt="Books" width="100" />
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png" alt="Laptop" width="100" />
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Technologist.png" alt="Developer" width="100" />

*A modern e-learning platform to explore courses, enroll, and master coding skills* 💻🚀

[Features](#-key-features) • [Technologies](#-tech-stack) • [Installation](#-quick-start) • [Preview](#-preview) • [Contact](#-lets-connect)

</div>

---

## 📖 About The Project

**Learn Coding Platform** is a comprehensive e-learning web application built with **React 19** and modern UI libraries. Users can browse coding courses, view detailed course information, add courses to cart, and manage their learning journey with an intuitive interface featuring smooth animations and dark/light theme support.

### 🎯 Purpose

To provide an engaging and seamless learning experience for aspiring developers:

- 🏠 Browse courses across multiple programming categories
- 📋 View detailed course information with instructor profiles
- 🛒 Add courses to cart and manage enrollments
- 🎨 Beautiful UI with smooth animations (Swiper, Framer Motion)
- 🌙 Dark/Light theme toggle for comfortable viewing
- 📱 Fully responsive design for all devices
- ⚡ Real-time typing animation effects

<div align="center">

### 🌟 **[Experience It Live →](https://learn-coding-platform.web.app/)**

</div>

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & User Management
- 📧 Email/Password Authentication
- 🔑 Google OAuth Integration
- 👤 User Profile Management
- 🔒 Protected Routes & Authorization
- 🚪 Secure Login/Logout Flow

</td>
<td width="50%">

### 🎨 UI/UX Excellence
- 📱 Fully Responsive Design
- 🌙 Dark/Light Theme Toggle
- ✨ Smooth Page Transitions (Framer Motion)
- 🎠 Interactive Course Carousel (Swiper)
- ⌨️ Typing Animation Effects
- 🎯 Modern Gradient Designs

</td>
</tr>
<tr>
<td width="50%">

### 📚 Course Management
- 📋 Browse All Available Courses
- 🔍 Course Details with Full Overview
- 👨‍🏫 Instructor Profiles & Ratings
- 🛒 Add to Cart Functionality
- 💾 LocalStorage for Cart Persistence
- ⏱ Course Duration & Level Info
- 💰 Pricing Information

</td>
<td width="50%">

### ⚡ Advanced Features
- 🎯 Category-wise Course Filtering
- 📊 Course Cards with Hover Effects
- 🔔 Toast Notifications (React Hot Toast)
- ⭐ Rating & Review Display
- 📖 Detailed Course Introduction & Overview
- 🎓 Student Count & Enrollment Stats
- 🔙 Smooth Navigation & Routing

</td>
</tr>
</table>

---

## 🛠 Tech Stack

<div align="center">

### **Core Technologies**

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.16-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.9.4-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12.4.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

### **Enhancement Libraries**

![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-0055FF?style=for-the-badge)
![Swiper](https://img.shields.io/badge/Swiper-12.0.3-6332F6?style=for-the-badge)
![React Hot Toast](https://img.shields.io/badge/Hot_Toast-2.6.0-FF6B6B?style=for-the-badge)
![Lucide](https://img.shields.io/badge/Lucide-0.548.0-F56565?style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-1.12.2-5A29E4?style=for-the-badge)

</div>

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.16",
    "axios": "^1.12.2",
    "firebase": "^12.4.0",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.548.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hot-toast": "^2.6.0",
    "react-router": "^7.9.4",
    "react-slick": "^0.31.0",
    "slick-carousel": "^1.8.1",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.16"
  }
}
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Firebase Account** (for authentication)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/TusharChow20/learn-coding-platform.git
   cd learn-coding-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory and add your Firebase configuration:
   
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Add Course Data**
   
   Make sure you have the following JSON files in your `public` folder:
   - `courses.json` - Category data
   - `allCourses.json` - Complete course list
   - `teacherData.json` - Instructor information

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `dist` folder.

### Deploy to Firebase Hosting

```bash
npm run build
firebase deploy
```

---

## 🎯 Key Functionalities

### 🎪 Interactive Banner
- Smooth typing animation effect
- 3D carousel slider with course/instructor cards
- Gradient backgrounds with theme support
- Call-to-action buttons with hover effects

### 📋 Course Management
- Dynamic course loading from JSON files
- Detailed course view with multiple sections
- Add to cart with duplicate prevention
- LocalStorage persistence for cart items
- Real-time cart counter updates

### 👨‍🏫 Instructor Profiles
- Detailed instructor information
- Rating and student count display
- Expertise and bio sections
- Profile images with ring effects

### 🎨 Theme System
- Context-based theme management
- Smooth theme transitions
- Persistent theme preference
- Dark/Light mode optimized designs

---

## 🔧 Configuration Files

### Firebase Configuration
Create `src/firebase.config.js`:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## 🎨 Theme Configuration

The project uses a custom theme context with TailwindCSS:

- **Dark Theme:** Gray gradients with purple accents
- **Light Theme:** Colorful gradients with blue/purple/pink
- **Smooth Transitions:** 500ms duration for all theme changes

---

## 🌟 Special Features

### Typing Animation Component
Custom React component with configurable speed and word pauses for engaging text reveals.

### Swiper Integration
3D coverflow effect carousel with:
- Auto-play functionality
- Touch/grab gestures
- Loop mode
- Custom pagination styling

### Toast Notifications
Contextual notifications for:
- ✅ Success messages (Add to cart)
- ❌ Error messages (Duplicate course)
- ℹ️ Information updates

---

## 📞 Let's Connect

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tusharchowdhury20211/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TusharChow20)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tusharchowdhury20211@gmail.com)

### Made with ❤️ by Tushar Chowdhury

⭐ **If you find this project helpful, please give it a star!** ⭐

</div>

---

<div align="center">

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Library
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Firebase](https://firebase.google.com/) - Authentication & Hosting
- [Swiper](https://swiperjs.com/) - Touch Slider
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide](https://lucide.dev/) - Icons
- [Tarikul Islam Anik](https://github.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis) - Animated Emojis

</div>

---

<div align="center">

**© 2025 Learn Coding Platform. All Rights Reserved.**

*Built with passion for learning and teaching* 🚀

</div>
