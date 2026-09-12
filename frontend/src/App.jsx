import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Landing/Home.jsx"

import Login from "./pages/Auth/Login.jsx"
import Register from "./pages/Auth/Register.jsx"

import StudentDashboard from "./pages/Student/StudentDashboard.jsx"
import MyProject from "./pages/Student/MyProject.jsx"
import CreateProject from "./pages/Student/CreateProject.jsx"
import SubmitProgress from "./pages/Student/SubmitProgress.jsx"
import StudentFeedback from "./pages/Student/Feedback.jsx"
import StudentProfile from "./pages/Student/StudentProfile.jsx"

import MentorDashboard from "./pages/Mentor/MentorDashboard.jsx"
import AssignedProjects from "./pages/Mentor/AssignedProjects.jsx"
import ProjectReview from "./pages/Mentor/ProjectReview.jsx"
import MentorFeedback from "./pages/Mentor/Feedback.jsx"
import Evaluation from "./pages/Mentor/Evaluation.jsx"

import AdminDashboard from "./pages/Admin/AdminDashboard.jsx"
import Projects from "./pages/Admin/Projects.jsx"
import Teams from "./pages/Admin/Teams.jsx"
import Mentors from "./pages/Admin/Mentors.jsx"
import AssignMentor from "./pages/Admin/AssignMentor.jsx"
import Reports from "./pages/Admin/Reports.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/student/my-project"
          element={<MyProject />}
        />

        <Route
          path="/student/create-project"
          element={<CreateProject />}
        />

        <Route
          path="/student/submit-progress"
          element={<SubmitProgress />}
        />

        <Route
          path="/student/feedback"
          element={<StudentFeedback />}
        />

        <Route
          path="/student/profile"
          element={<StudentProfile />}
        />

        <Route
          path="/mentor/dashboard"
          element={<MentorDashboard />}
        />

        <Route
          path="/mentor/assigned-projects"
          element={<AssignedProjects />}
        />

        <Route
          path="/mentor/project-review"
          element={<ProjectReview />}
        />

        <Route
          path="/mentor/feedback"
          element={<MentorFeedback />}
        />

        <Route
          path="/mentor/evaluation"
          element={<Evaluation />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/projects"
          element={<Projects />}
        />

        <Route
          path="/admin/teams"
          element={<Teams />}
        />

        <Route
          path="/admin/mentors"
          element={<Mentors />}
        />

        <Route
          path="/admin/assign-mentor"
          element={<AssignMentor />}
        />

        <Route
          path="/admin/reports"
          element={<Reports />}
        />

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App