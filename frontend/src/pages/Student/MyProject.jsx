import {
  FolderKanban,
  Users,
  UserRound,
  CalendarDays,
  Code2,
  CheckCircle2,
  FileText,
  MessageSquare,
  ArrowRight,
  CircleDot,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import DashboardHeader from "@/components/DashboardHeader"
import StatusBadge from "@/components/StatusBadge"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function MyProject() {
  const navigate = useNavigate()

  const project = {
    title: "SmartEdu Platform",
    domain: "Web Development",
    description:
      "SmartEdu is a modern education platform designed to help students manage courses, assignments, learning progress and academic resources in one place.",
    progress: 65,
    status: "Active",
    startDate: "01 August 2026",
    endDate: "30 September 2026",
    mentor: {
      name: "Dr. Sharma",
      role: "Project Mentor",
    },
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
    ],
    teamMembers: [
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
  }

  const activities = [
    {
      id: 1,
      title: "Progress updated",
      description:
        "Project progress was updated to 65%.",
      time: "Today",
      icon: <CheckCircle2 size={18} />,
    },
    {
      id: 2,
      title: "Mentor feedback received",
      description:
        "Your mentor added new feedback and suggestions.",
      time: "Yesterday",
      icon: <MessageSquare size={18} />,
    },
    {
      id: 3,
      title: "Progress submitted",
      description:
        "Your team submitted the latest project progress.",
      time: "2 days ago",
      icon: <FileText size={18} />,
    },
    {
      id: 4,
      title: "Project created",
      description:
        "Your project was successfully created.",
      time: "01 August 2026",
      icon: <FolderKanban size={18} />,
    },
  ]

  return (
    <div className="min-h-screen bg-sky-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <DashboardHeader
        title="My Project"
        description="View your project details, progress and team information."
      />

      {/* Main Project Overview Card */}
      <Card className="border border-sky-100 bg-white shadow-xl">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="bg-sky-50 text-sky-700 border border-sky-200">
                  {project.domain}
                </Badge>
                <StatusBadge status={project.status} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {project.title}
              </h2>

              <p className="mt-3 leading-relaxed text-slate-600 text-sm sm:text-base">
                {project.description}
              </p>
            </div>

            <Button
              onClick={() =>
                navigate("/student/submit-progress")
              }
              className="gap-2 bg-black hover:bg-zinc-900 text-white font-semibold h-11 px-6 shadow-md shrink-0"
            >
              <FileText size={18} />
              Submit Progress
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <FolderKanban size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Project Status</p>
              <div className="mt-1">
                <StatusBadge status={project.status} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <CircleDot size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Progress</p>
              <p className="text-2xl font-bold text-slate-900">
                {project.progress}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <Users size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Team Members</p>
              <p className="text-2xl font-bold text-slate-900">
                {project.teamMembers.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <CalendarDays size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Expected Completion</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {project.endDate}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress & Mentor Section */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Project Progress</CardTitle>
            <CardDescription className="text-slate-500">
              Current completion status of your project.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="font-semibold text-slate-700">Overall Progress</p>
                <p className="text-lg font-bold text-sky-600">
                  {project.progress}%
                </p>
              </div>
              <Progress
                value={project.progress}
                className="h-3 bg-sky-50 border border-sky-100"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Start Date</p>
                <p className="mt-1.5 font-semibold text-slate-800">
                  {project.startDate}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expected Completion</p>
                <p className="mt-1.5 font-semibold text-slate-800">
                  {project.endDate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Project Mentor</CardTitle>
            <CardDescription className="text-slate-500">
              Your assigned mentor.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-600 border border-sky-200 font-bold">
                <UserRound size={22} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  {project.mentor.name}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {project.mentor.role}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-5 w-full gap-2 border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 h-11"
              onClick={() =>
                navigate("/student/feedback")
              }
            >
              <MessageSquare size={18} />
              View Feedback
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Team Members & Technologies Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <Users size={20} className="text-sky-600" />
              Team Members
            </CardTitle>
            <CardDescription className="text-slate-500">
              Students working on this project.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 font-bold text-sky-600 border border-sky-200 text-sm">
                    {member.name.charAt(0)}
                  </div>

                  <p className="mt-3 font-semibold text-slate-900 text-sm">
                    {member.name}
                  </p>

                  <p className="text-xs font-medium text-slate-500">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <Code2 size={20} className="text-sky-600" />
              Technologies
            </CardTitle>
            <CardDescription className="text-slate-500">
              Technology stack used.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Badge
                  key={technology}
                  variant="secondary"
                  className="px-3 py-1.5 bg-sky-50 text-sky-700 border border-sky-200 font-medium text-xs"
                >
                  {technology}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Recent Activity</CardTitle>
            <CardDescription className="text-slate-500">
              Latest updates related to your project.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 pt-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 border border-sky-200">
                  {activity.icon}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <p className="font-semibold text-slate-800 text-sm">
                      {activity.title}
                    </p>

                    <span className="text-xs text-slate-400 font-medium">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Quick Actions</CardTitle>
            <CardDescription className="text-slate-500">
              Manage your project quickly.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 pt-6">
            <Button
              variant="outline"
              className="w-full justify-between border-slate-200 bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700 h-11"
              onClick={() =>
                navigate("/student/submit-progress")
              }
            >
              <span className="flex items-center gap-2 font-medium">
                <FileText size={18} className="text-sky-600" />
                Submit Progress
              </span>
              <ArrowRight size={18} className="text-slate-400" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between border-slate-200 bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700 h-11"
              onClick={() =>
                navigate("/student/feedback")
              }
            >
              <span className="flex items-center gap-2 font-medium">
                <MessageSquare size={18} className="text-sky-600" />
                Mentor Feedback
              </span>
              <ArrowRight size={18} className="text-slate-400" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between border-slate-200 bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700 h-11"
              onClick={() =>
                navigate("/student/create-project")
              }
            >
              <span className="flex items-center gap-2 font-medium">
                <FolderKanban size={18} className="text-sky-600" />
                Edit Project
              </span>
              <ArrowRight size={18} className="text-slate-400" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}