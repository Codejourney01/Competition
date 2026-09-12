import { useMemo, useState } from "react"
import {
  BarChart3,
  Download,
  FileText,
  FolderKanban,
  Users,
  CheckCircle2,
  Search,
} from "lucide-react"

import DashboardHeader from "@/components/DashboardHeader"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export default function Reports() {
  const [search, setSearch] = useState("")

  const projects = [
    {
      id: 1,
      title: "SmartEdu Platform",
      team: "Team Alpha",
      mentor: "Dr. Sharma",
      progress: 65,
      status: "Active",
    },
    {
      id: 2,
      title: "HealthTrack",
      team: "Team Beta",
      mentor: "Dr. Mehta",
      progress: 40,
      status: "Under Review",
    },
    {
      id: 3,
      title: "EcoVision",
      team: "Team Gamma",
      mentor: "Not Assigned",
      progress: 20,
      status: "Pending",
    },
    {
      id: 4,
      title: "CareerConnect",
      team: "Team Delta",
      mentor: "Dr. Patel",
      progress: 85,
      status: "Approved",
    },
    {
      id: 5,
      title: "FarmAssist",
      team: "Team Epsilon",
      mentor: "Not Assigned",
      progress: 10,
      status: "Pending",
    },
  ]

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      `${project.title} ${project.team} ${project.mentor} ${project.status}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [search])

  const totalProjects = projects.length

  const averageProgress = Math.round(
    projects.reduce(
      (total, project) => total + project.progress,
      0
    ) / projects.length
  )

  const completedProjects = projects.filter(
    (project) => project.progress >= 80
  ).length

  const activeTeams = new Set(
    projects.map((project) => project.team)
  ).size

  const statusCount = {
    Active: projects.filter(
      (project) => project.status === "Active"
    ).length,

    Pending: projects.filter(
      (project) => project.status === "Pending"
    ).length,

    "Under Review": projects.filter(
      (project) => project.status === "Under Review"
    ).length,

    Approved: projects.filter(
      (project) => project.status === "Approved"
    ).length,
  }

  const handleExport = (type) => {
    alert(`${type} report export started`)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Reports"
        description="View project progress, team performance and system reports."
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleExport("CSV")}
            >
              <Download />
              CSV
            </Button>

            <Button
              onClick={() => handleExport("PDF")}
            >
              <FileText />
              Export Report
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Projects
              </p>

              <p className="text-2xl font-bold">
                {totalProjects}
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
                Average Progress
              </p>

              <p className="text-2xl font-bold">
                {averageProgress}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                High Progress
              </p>

              <p className="text-2xl font-bold">
                {completedProjects}
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
                Active Teams
              </p>

              <p className="text-2xl font-bold">
                {activeTeams}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Status Overview</CardTitle>

            <CardDescription>
              Distribution of projects by their current status.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {Object.entries(statusCount).map(
              ([status, count]) => {
                const percentage = Math.round(
                  (count / totalProjects) * 100
                )

                return (
                  <div key={status}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {status}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        {count} Projects
                      </span>
                    </div>

                    <Progress value={percentage} />
                  </div>
                )
              }
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Summary</CardTitle>

            <CardDescription>
              Overall performance of the project monitoring system.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Overall Project Progress
              </p>

              <div className="mt-2 flex items-end justify-between">
                <p className="text-3xl font-bold">
                  {averageProgress}%
                </p>

                <Badge variant="secondary">
                  Average
                </Badge>
              </div>

              <Progress
                value={averageProgress}
                className="mt-4"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">
                  Projects Reviewed
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {
                    projects.filter(
                      (project) =>
                        project.status === "Under Review" ||
                        project.status === "Approved"
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">
                  Mentors Assigned
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {
                    projects.filter(
                      (project) =>
                        project.mentor !== "Not Assigned"
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Performance Report</CardTitle>

          <CardDescription>
            Detailed overview of every project and its progress.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative mb-5 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Search reports..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>

                    <TableCell>
                      {project.team}
                    </TableCell>

                    <TableCell>
                      {project.mentor}
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
                      <Badge
                        variant={
                          project.status === "Approved"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredProjects.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No reports found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}