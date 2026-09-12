export const dummyUser = {
  id: 1,
  name: "Vishu",
  email: "vishu@example.com",
  role: "Student",
  phone: "+91 9876543210",
  college: "ABC College",
  course: "Bachelor of Computer Applications",
  semester: "Final Year",
  skills: [
    "React",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
  ],
}

export const dummyProjects = [
  {
    id: 1,
    title: "SmartEdu Platform",
    domain: "Web Development",
    description:
      "A modern education platform designed to help students manage courses, assignments, learning progress and academic resources.",
    status: "Active",
    progress: 65,
    startDate: "01 August 2026",
    endDate: "30 September 2026",
    mentor: {
      id: 1,
      name: "Dr. Sharma",
      email: "sharma@example.com",
      specialization: "Web Development",
    },
    team: [
      {
        id: 1,
        name: "Vishu",
        email: "vishu@example.com",
        role: "Team Leader",
      },
      {
        id: 2,
        name: "Rahul",
        email: "rahul@example.com",
        role: "Frontend Developer",
      },
      {
        id: 3,
        name: "Aman",
        email: "aman@example.com",
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

  {
    id: 2,
    title: "HealthTrack",
    domain: "Mobile Application",
    description:
      "A healthcare management application for tracking appointments, health records and daily activities.",
    status: "Pending",
    progress: 20,
    startDate: "10 August 2026",
    endDate: "15 October 2026",
    mentor: {
      id: 2,
      name: "Prof. Verma",
      email: "verma@example.com",
      specialization: "Mobile Development",
    },
    team: [
      {
        id: 4,
        name: "Priya",
        email: "priya@example.com",
        role: "Team Leader",
      },
      {
        id: 5,
        name: "Rohan",
        email: "rohan@example.com",
        role: "Developer",
      },
    ],
    technologies: [
      "React Native",
      "Node.js",
      "MongoDB",
    ],
  },

  {
    id: 3,
    title: "Campus Connect",
    domain: "Web Development",
    description:
      "A platform for students to connect, share announcements and manage college activities.",
    status: "Completed",
    progress: 100,
    startDate: "01 July 2026",
    endDate: "25 August 2026",
    mentor: {
      id: 3,
      name: "Dr. Gupta",
      email: "gupta@example.com",
      specialization: "Software Engineering",
    },
    team: [
      {
        id: 6,
        name: "Arjun",
        email: "arjun@example.com",
        role: "Team Leader",
      },
      {
        id: 7,
        name: "Sneha",
        email: "sneha@example.com",
        role: "Frontend Developer",
      },
    ],
    technologies: [
      "React",
      "Firebase",
      "Tailwind CSS",
    ],
  },
]

export const dummyFeedbacks = [
  {
    id: 1,
    projectId: 1,
    project: "SmartEdu Platform",
    category: "Technical",
    priority: "High",
    message:
      "Please improve API error handling and complete authentication integration before the next submission.",
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
      "The dashboard design is good. Improve mobile responsiveness and maintain consistent spacing.",
    mentor: "Dr. Sharma",
    date: "Yesterday",
    read: true,
  },

  {
    id: 3,
    projectId: 1,
    project: "SmartEdu Platform",
    category: "Documentation",
    priority: "Low",
    message:
      "Add more details to the project documentation and clearly explain the technology stack.",
    mentor: "Dr. Sharma",
    date: "2 days ago",
    read: true,
  },

  {
    id: 4,
    projectId: 2,
    project: "HealthTrack",
    category: "Planning",
    priority: "Medium",
    message:
      "Break the project into smaller milestones before starting development.",
    mentor: "Prof. Verma",
    date: "3 days ago",
    read: false,
  },
]

export const dummyProgressSubmissions = [
  {
    id: 1,
    projectId: 1,
    projectTitle: "SmartEdu Platform",
    progress: 65,
    summary:
      "Student dashboard, project management UI and initial backend structure have been completed.",
    completedTasks: [
      "Project UI design completed",
      "Student dashboard completed",
      "Project database structure created",
    ],
    challenge:
      "Authentication and API integration are still in progress.",
    nextSteps:
      "Complete authentication, connect APIs and test the application.",
    submittedAt: "10 September 2026",
    status: "Reviewed",
  },
]

export const dummyActivities = [
  {
    id: 1,
    projectId: 1,
    title: "Progress submitted",
    description:
      "Your latest project progress was submitted successfully.",
    time: "Today",
    type: "progress",
  },

  {
    id: 2,
    projectId: 1,
    title: "New mentor feedback",
    description:
      "Dr. Sharma added feedback for your latest submission.",
    time: "Yesterday",
    type: "feedback",
  },

  {
    id: 3,
    projectId: 1,
    title: "Project progress updated",
    description:
      "Project progress was updated to 65%.",
    time: "2 days ago",
    type: "update",
  },

  {
    id: 4,
    projectId: 1,
    title: "Project created",
    description:
      "SmartEdu Platform was successfully created.",
    time: "01 August 2026",
    type: "project",
  },
]

export const dummyMentors = [
  {
    id: 1,
    name: "Dr. Sharma",
    email: "sharma@example.com",
    specialization: "Web Development",
    assignedProjects: 2,
    status: "Active",
  },

  {
    id: 2,
    name: "Prof. Verma",
    email: "verma@example.com",
    specialization: "Mobile Development",
    assignedProjects: 1,
    status: "Active",
  },

  {
    id: 3,
    name: "Dr. Gupta",
    email: "gupta@example.com",
    specialization: "Software Engineering",
    assignedProjects: 1,
    status: "Active",
  },
]

export const dummyTeams = [
  {
    id: 1,
    name: "Team Alpha",
    projectId: 1,
    project: "SmartEdu Platform",
    mentor: "Dr. Sharma",
    members: 3,
    status: "Active",
  },

  {
    id: 2,
    name: "Team Beta",
    projectId: 2,
    project: "HealthTrack",
    mentor: "Prof. Verma",
    members: 2,
    status: "Active",
  },

  {
    id: 3,
    name: "Team Gamma",
    projectId: 3,
    project: "Campus Connect",
    mentor: "Dr. Gupta",
    members: 2,
    status: "Completed",
  },
]