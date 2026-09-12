import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    id: 1,
    name: "Vishu",
    email: "vishu@example.com",
    role: "Student",
    phone: "+91 9876543210",
    college: "ABC College",
    course: "Bachelor of Computer Applications",
    semester: "Final Year",
  })

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "SmartEdu Platform",
      domain: "Web Development",
      description:
        "A modern education platform designed to help students manage courses, assignments and academic progress.",
      status: "Active",
      progress: 65,
      startDate: "01 August 2026",
      endDate: "30 September 2026",
      mentor: "Dr. Sharma",
      team: [
        {
          id: 1,
          name: "Vishu",
          role: "Team Leader",
        },
        {
          id: 2,
          name: "Rahul",
          role: "Frontend Developer",
        },
        {
          id: 3,
          name: "Aman",
          role: "Backend Developer",
        },
      ],
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
      ],
    },
  ])

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      projectId: 1,
      project: "SmartEdu Platform",
      category: "Technical",
      priority: "High",
      message:
        "Please improve API error handling and complete authentication integration.",
      mentor: "Dr. Sharma",
      date: "Today",
      read: false,
    },
    {
      id: 2,
      projectId: 1,
      project: "SmartEdu Platform",
      category: "UI/UX",
      priority: "Medium",
      message:
        "The dashboard design is good. Improve mobile responsiveness and spacing.",
      mentor: "Dr. Sharma",
      date: "Yesterday",
      read: true,
    },
  ])

  const [progressSubmissions, setProgressSubmissions] =
    useState([])

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Project created",
      description:
        "SmartEdu Platform was successfully created.",
      time: "01 August 2026",
    },
  ])

  const addProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      status: "Pending",
      progress: 0,
      mentor: "Not Assigned",
      ...projectData,
    }

    setProjects((prev) => [
      ...prev,
      newProject,
    ])

    setActivities((prev) => [
      {
        id: Date.now(),
        title: "Project created",
        description: `${projectData.title} was successfully created.`,
        time: "Just now",
      },
      ...prev,
    ])
  }

  const updateProject = (projectId, updatedData) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              ...updatedData,
            }
          : project
      )
    )
  }

  const submitProgress = (submission) => {
    const newSubmission = {
      id: Date.now(),
      submittedAt: new Date().toLocaleDateString(),
      status: "Pending Review",
      ...submission,
    }

    setProgressSubmissions((prev) => [
      newSubmission,
      ...prev,
    ])

    updateProject(submission.projectId, {
      progress: submission.progress,
    })

    setActivities((prev) => [
      {
        id: Date.now(),
        title: "Progress submitted",
        description:
          "Latest project progress was submitted for mentor review.",
        time: "Just now",
      },
      ...prev,
    ])
  }

  const addFeedback = (feedback) => {
    const newFeedback = {
      id: Date.now(),
      read: false,
      date: "Just now",
      ...feedback,
    }

    setFeedbacks((prev) => [
      newFeedback,
      ...prev,
    ])
  }

  const markFeedbackAsRead = (feedbackId) => {
    setFeedbacks((prev) =>
      prev.map((feedback) =>
        feedback.id === feedbackId
          ? {
              ...feedback,
              read: true,
            }
          : feedback
      )
    )
  }

  const updateUser = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }))
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        updateUser,

        projects,
        setProjects,
        addProject,
        updateProject,

        feedbacks,
        setFeedbacks,
        addFeedback,
        markFeedbackAsRead,

        progressSubmissions,
        setProgressSubmissions,
        submitProgress,

        activities,
        setActivities,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error(
      "useAppContext must be used inside AppProvider"
    )
  }

  return context
}