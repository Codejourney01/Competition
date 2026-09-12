import {
  FolderKanban,
  CheckCircle2,
  Clock,
  MessageSquare,
  Users,
  FileText,
  ArrowRight,
  CircleDot,
  CalendarDays,
  UserRound,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import DashboardHeader from "@/components/DashboardHeader"
import StatusBadge from "@/components/StatusBadge"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function StudentDashboard() {
  const navigate = useNavigate()

  const project = {
    title: "SmartEdu Platform",
    progress: 65,
    status: "Active",
    team: "Team Alpha",
    mentor: "Dr. Sharma",
    deadline: "30 September 2026",
  }

  const activities = [
    {
      id: 1,
      title: "Progress submitted",
      description: "Your latest project progress was submitted successfully.",
      time: "Today",
      icon: <FileText size={18} />,
    },
    {
      id: 2,
      title: "New mentor feedback",
      description: "Dr. Sharma added feedback for your latest submission.",
      time: "Yesterday",
      icon: <MessageSquare size={18} />,
    },
    {
      id: 3,
      title: "Project progress updated",
      description: "Your project progress is now at 65%.",
      time: "2 days ago",
      icon: <CheckCircle2 size={18} />,
    },
  ]

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Student Dashboard"
        description="Track your project progress, mentor feedback and upcoming work."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                My Projects
              </p>

              <p className="text-2xl font-bold">
                1
              </p>
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
                Project Progress
              </p>

              <p className="text-2xl font-bold">
                {project.progress}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <Clock size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Pending Tasks
              </p>

              <p className="text-2xl font-bold">
                3
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <MessageSquare size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                New Feedback
              </p>

              <p className="text-2xl font-bold">
                1
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <CardTitle>My Current Project</CardTitle>

                <CardDescription>
                  Overview of your active project.
                </CardDescription>
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  navigate("/student/my-project")
                }
              >
                View Project
                <ArrowRight size={18} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-lg border p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">
                      {project.title}
                    </h3>

                    <StatusBadge status={project.status} />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {project.team}
                  </p>
                </div>

                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <FolderKanban size={24} />
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Overall Progress
                  </p>

                  <p className="font-semibold">
                    {project.progress}%
                  </p>
                </div>

                <Progress
                  value={project.progress}
                  className="h-3"
                />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                    <UserRound size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Project Mentor
                    </p>

                    <p className="font-medium">
                      {project.mentor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Deadline
                    </p>

                    <p className="font-medium">
                      {project.deadline}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                onClick={() =>
                  navigate("/student/submit-progress")
                }
              >
                <FileText />
                Submit Progress
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  navigate("/student/feedback")
                }
              >
                <MessageSquare />
                View Feedback
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>

            <CardDescription>
              Access your project tools quickly.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate("/student/my-project")
              }
            >
              <span className="flex items-center gap-2">
                <FolderKanban size={18} />
                My Project
              </span>

              <ArrowRight size={18} />
            </Button>

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
                navigate("/student/profile")
              }
            >
              <span className="flex items-center gap-2">
                <UserRound size={18} />
                My Profile
              </span>

              <ArrowRight size={18} />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>

            <CardDescription>
              Latest updates from your project.
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
            <CardTitle>Project Team</CardTitle>

            <CardDescription>
              Members working on your project.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                V
              </div>

              <div className="flex-1">
                <p className="font-medium">
                  Vishu
                </p>

                <p className="text-sm text-muted-foreground">
                  Team Leader
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                R
              </div>

              <div className="flex-1">
                <p className="font-medium">
                  Rahul
                </p>

                <p className="text-sm text-muted-foreground">
                  Frontend Developer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                A
              </div>

              <div className="flex-1">
                <p className="font-medium">
                  Aman
                </p>

                <p className="text-sm text-muted-foreground">
                  Backend Developer
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                navigate("/student/my-project")
              }
            >
              <Users />
              View Project Team
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}