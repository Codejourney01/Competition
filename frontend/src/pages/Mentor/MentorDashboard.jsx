import {
  FolderKanban,
  ClipboardCheck,
  BarChart3,
  MessageSquare,
  ArrowRight,
  Clock,
  CheckCircle2,
  Users,
  Star,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function MentorDashboard() {
  const navigate = useNavigate()

  const projects = [
    {
      id: 1,
      title: "SmartEdu Platform",
      team: "Team Alpha",
      students: 3,
      progress: 65,
      status: "Active",
      lastUpdate: "2 hours ago",
    },
    {
      id: 2,
      title: "HealthTrack",
      team: "Team Beta",
      students: 3,
      progress: 40,
      status: "Under Review",
      lastUpdate: "Yesterday",
    },
    {
      id: 3,
      title: "CareerConnect",
      team: "Team Delta",
      students: 3,
      progress: 85,
      status: "Active",
      lastUpdate: "3 days ago",
    },
  ]

  const totalProjects = projects.length

  const underReview = projects.filter(
    (project) => project.status === "Under Review"
  ).length

  const activeProjects = projects.filter(
    (project) => project.status === "Active"
  ).length

  const averageProgress = Math.round(
    projects.reduce(
      (total, project) => total + project.progress,
      0
    ) / projects.length
  )

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Mentor Dashboard"
        description="Monitor assigned projects, review progress and guide student teams."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Assigned Projects
              </p>

              <p className="text-2xl font-bold">
                {totalProjects}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <ClipboardCheck size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Under Review
              </p>

              <p className="text-2xl font-bold">
                {underReview}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <BarChart3 size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Avg. Progress
              </p>

              <p className="text-2xl font-bold">
                {averageProgress}%
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
                Active Projects
              </p>

              <p className="text-2xl font-bold">
                {activeProjects}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Assigned Projects</CardTitle>

                <CardDescription>
                  Overview of your student projects.
                </CardDescription>
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  navigate("/mentor/assigned-projects")
                }
              >
                View All
                <ArrowRight />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <p className="font-medium">
                          {project.title}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {project.students} Students
                        </p>
                      </TableCell>

                      <TableCell>
                        {project.team}
                      </TableCell>

                      <TableCell className="min-w-40">
                        <div className="flex items-center gap-3">
                          <Progress
                            value={project.progress}
                            className="w-20"
                          />

                          <span className="text-sm">
                            {project.progress}%
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <StatusBadge
                          status={project.status}
                        />
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/mentor/project-review?id=${project.id}`
                            )
                          }
                        >
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>

            <CardDescription>
              Manage your mentoring tasks.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate("/mentor/assigned-projects")
              }
            >
              <span className="flex items-center gap-2">
                <FolderKanban size={18} />
                Assigned Projects
              </span>

              <ArrowRight size={18} />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate("/mentor/project-review")
              }
            >
              <span className="flex items-center gap-2">
                <ClipboardCheck size={18} />
                Review Project
              </span>

              <ArrowRight size={18} />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate("/mentor/feedback")
              }
            >
              <span className="flex items-center gap-2">
                <MessageSquare size={18} />
                Give Feedback
              </span>

              <ArrowRight size={18} />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate("/mentor/evaluation")
              }
            >
              <span className="flex items-center gap-2">
                <Star size={18} />
                Evaluate Project
              </span>

              <ArrowRight size={18} />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Progress</CardTitle>

            <CardDescription>
              Current progress across assigned teams.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {project.team}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {project.title}
                    </p>
                  </div>

                  <span className="text-sm font-medium">
                    {project.progress}%
                  </span>
                </div>

                <Progress value={project.progress} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>

            <CardDescription>
              Latest updates from student teams.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex gap-3">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Clock size={18} />
              </div>

              <div>
                <p className="font-medium">
                  SmartEdu Platform updated
                </p>

                <p className="text-sm text-muted-foreground">
                  Team Alpha submitted a new progress update.
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  2 hours ago
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                <ClipboardCheck size={18} />
              </div>

              <div>
                <p className="font-medium">
                  Project awaiting review
                </p>

                <p className="text-sm text-muted-foreground">
                  HealthTrack is ready for mentor review.
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Yesterday
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <p className="font-medium">
                  Progress milestone reached
                </p>

                <p className="text-sm text-muted-foreground">
                  CareerConnect reached 85% completion.
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  3 days ago
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                <Users size={18} />
              </div>

              <div>
                <p className="font-medium">
                  Team activity updated
                </p>

                <p className="text-sm text-muted-foreground">
                  Team Beta updated their project progress.
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  4 days ago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}