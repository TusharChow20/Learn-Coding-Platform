import React from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Award,
  Code,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Download,
} from "lucide-react";
import TypingText from "./TypingText";

const AboutUs = () => {
  const skills = [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "JavaScript", level: 88 },
    { name: "React", level: 85 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Firebase", level: 75 },
    { name: "Python", level: 70 },
    { name: "GitHub", level: 80 },
  ];

  const experiences = [
    {
      role: "Contributor",
      organization:
        "Laboratory of Space System Engineering & Technology - LaSSET",
      duration: "Mar 2023 - Mar 2024",
      location: "Dhaka, Bangladesh",
    },
    {
      role: "Junior Contributor of Mechanical Team",
      organization: "BRACU DICHARI",
      duration: "Sep 2022 - Dec 2023",
      location: "Dhaka, Bangladesh",
    },
    {
      role: "Executive",
      organization: "Robotics Club of BRAC University",
      duration: "Apr 2021 - Mar 2023",
      location: "Dhaka, Bangladesh",
    },
  ];

  const achievements = [
    "Communication Hacks Certification",
    "CV Writing & Interview Excellence",
    "National Basketball Referees Clinic 2025",
    "Presentation & Public Speaking",
    "International Astronomical Search Collaboration",
    "Cybersecurity for Everyone",
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
              <div className="inline-block">
                <span className="badge badge-primary badge-lg">
                  Full Stack Developer
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <TypingText text="Hi, I'm " speed={20} className="inline" />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  <TypingText text="Tushar Chowdhury" speed={300} />
                </span>
                <span className="animate-pulse">|</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed">
                <TypingText
                  speed={30}
                  text="A passionate web developer specializing in React, Firebase, and
                modern frontend technologies. I love building beautiful,
                responsive applications that solve real-world problems."
                ></TypingText>
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://www.linkedin.com/in/tusharchowdhury20211/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary gap-2"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  LinkedIn
                </a>

                <a
                  href="https://github.com/TusharChow20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline gap-2"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  GitHub
                </a>

                <a
                  href="/Tushar_CV.pdf"
                  download="Tushar_Chowdhury_CV.pdf"
                  className="btn btn-accent gap-2 flex items-center"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download CV
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-full bg-base-100 flex items-center justify-center overflow-hidden">
                    <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                      <img src="/tusharPic.png" alt="Tushar" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-content rounded-full p-3 sm:p-4 shadow-lg">
                  <Code className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="space-y-12 sm:space-y-16">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              About Me
            </h2>
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body p-4 sm:p-6 lg:p-8">
                <p className="text-sm sm:text-base lg:text-lg text-base-content/80 leading-relaxed mb-4">
                  I am a highly passionate and hardworking individual with a
                  strong desire to learn and grow in the field of web
                  development. I approach my studies and projects with
                  enthusiasm and a positive attitude, which helps me overcome
                  challenges and achieve my goals.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-base-content/80 leading-relaxed mb-4">
                  Currently, I am learning frontend development along with
                  Firebase for authentication and database management, and
                  exploring Node.js and MongoDB for backend development. My
                  dedication to mastering these technologies reflects my
                  commitment to building a strong foundation as a full-stack
                  developer.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-base-content/80 leading-relaxed">
                  In addition to being a quick learner, I possess strong soft
                  skills such as communication, teamwork, and problem-solving. I
                  work effectively in collaborative environments, express my
                  ideas clearly, and handle challenges with confidence and
                  adaptability.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
              Technical Skills
            </h2>
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm sm:text-base font-semibold">
                          {skill.name}
                        </span>
                        <span className="text-xs sm:text-sm text-base-content/70">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-base-300 rounded-full h-2 sm:h-2.5">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
              Experience
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="card-body p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold">
                          {exp.role}
                        </h3>
                        <p className="text-sm sm:text-base text-primary font-medium">
                          {exp.organization}
                        </p>
                      </div>
                      <div className="badge badge-outline badge-lg">
                        {exp.duration}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-base-content/70 flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exp.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-success" />
              Achievements & Certifications
            </h2>
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 sm:p-4 bg-base-300/50 rounded-lg hover:bg-base-300 transition-colors"
                    >
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-base-content/80">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
