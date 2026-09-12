import {
  FolderKanban,
  Users,
  UserRound,
  CalendarDays,
  Code2,
  CheckCircle2,
  Clock,
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
    <div className="space-y-6">
      <DashboardHeader
        title="My Project"
        description="View your project details, progress and team information."
      />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <Badge variant="secondary">
                  {project.domain}
                </Badge>

                <StatusBadge status={project.status} />
              </div>

              <h2 className="text-2xl font-bold">
                {project.title}
              </h2>

              <p className="mt-3 leading-7 text-muted-foreground">
                {project.description}
              </p>
            </div>

            <Button
              onClick={() =>
                navigate("/student/submit-progress")
              }
            >
              <FileText />
              Submit Progress
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Project Status
              </p>

              <div className="mt-1">
                <StatusBadge status={project.status} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <CircleDot size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Progress
              </p>

              <p className="text-2xl font-bold">
                {project.progress}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <Users size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Team Members
              </p>

              <p className="text-2xl font-bold">
                {project.teamMembers.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <CalendarDays size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Expected Completion
              </p>

              <p className="text-sm font-semibold">
                {project.endDate}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>

            <CardDescription>
              Current completion status of your project.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="font-medium">
                  Overall Progress
                </p>

                <p className="text-lg font-bold">
                  {project.progress}%
                </p>
              </div>

              <Progress
                value={project.progress}
                className="h-3"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">
                  Start Date
                </p>

                <p className="mt-2 font-semibold">
                  {project.startDate}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">
                  Expected Completion
                </p>

                <p className="mt-2 font-semibold">
                  {project.endDate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Mentor</CardTitle>

            <CardDescription>
              Your assigned mentor.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserRound size={22} />
              </div>

              <div>
                <p className="font-semibold">
                  {project.mentor.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  {project.mentor.role}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() =>
                navigate("/student/feedback")
              }
            >
              <MessageSquare />
              View Feedback
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Team Members
            </CardTitle>

            <CardDescription>
              Students working on this project.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {member.name.charAt(0)}
                  </div>

                  <p className="mt-3 font-semibold">
                    {member.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 size={20} />
              Technologies
            </CardTitle>

            <CardDescription>
              Technology stack used.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Badge
                  key={technology}
                  variant="secondary"
                  className="px-3 py-2"
                >
                  {technology}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>

            <CardDescription>
              Latest updates related to your project.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {activity.icon}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <p className="font-medium">
                      {activity.title}
                    </p>

                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>

            <CardDescription>
              Manage your project quickly.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate("/student/submit-progress")
              }
            >
              <span className="flex items-center gap-2">
                <FileText size={18} />
                Submit Progress
              </span>

              <ArrowRight size={18} />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate("/student/feedback")
              }
            >
              <span className="flex items-center gap-2">
                <MessageSquare size={18} />
                Mentor Feedback
              </span>

              <ArrowRight size={18} />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate("/student/create-project")
              }
            >
              <span className="flex items-center gap-2">
                <FolderKanban size={18} />
                Edit Project
              </span>

              <ArrowRight size={18} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}