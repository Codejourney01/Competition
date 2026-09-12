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
    <div className="min-h-screen bg-sky-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <DashboardHeader
        title="Reports"
        description="View project progress, team performance and system reports."
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleExport("CSV")}
              className="gap-2 border-slate-200 bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700 h-11"
            >
              <Download size={16} />
              CSV
            </Button>

            <Button
              onClick={() => handleExport("PDF")}
              className="gap-2 bg-black hover:bg-zinc-900 text-white font-semibold h-11 shadow-md"
            >
              <FileText size={16} />
              Export Report
            </Button>
          </div>
        }
      />

      {/* Top Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                Total Projects
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {totalProjects}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <BarChart3 size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                Average Progress
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {averageProgress}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                High Progress
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {completedProjects}
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
              <p className="text-sm text-slate-500 font-medium">
                Active Teams
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {activeTeams}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Project Status Overview</CardTitle>

            <CardDescription className="text-slate-500">
              Distribution of projects by their current status.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {Object.entries(statusCount).map(
              ([status, count]) => {
                const percentage = Math.round(
                  (count / totalProjects) * 100
                )

                return (
                  <div key={status} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-700">
                        {status}
                      </span>

                      <span className="text-slate-500 font-medium">
                        {count} Projects ({percentage}%)
                      </span>
                    </div>

                    <Progress value={percentage} className="h-2.5 bg-sky-50 border border-sky-100" />
                  </div>
                )
              }
            )}
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">System Summary</CardTitle>

            <CardDescription className="text-slate-500">
              Overall performance of the project monitoring system.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Overall Project Progress
              </p>

              <div className="mt-2 flex items-end justify-between">
                <p className="text-3xl font-bold text-slate-900">
                  {averageProgress}%
                </p>

                <Badge variant="secondary" className="bg-sky-50 text-sky-700 border border-sky-200">
                  Average
                </Badge>
              </div>

              <Progress
                value={averageProgress}
                className="mt-4 h-2.5 bg-white border border-sky-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Projects Reviewed
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {
                    projects.filter(
                      (project) =>
                        project.status === "Under Review" ||
                        project.status === "Approved"
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Mentors Assigned
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
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

      {/* Project Performance Report Table Card */}
      <Card className="border border-sky-100 bg-white shadow-xl">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="text-lg text-slate-900">Project Performance Report</CardTitle>

          <CardDescription className="text-slate-500">
            Detailed overview of every project and its progress.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="relative mb-6 max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <Input
              placeholder="Search reports..."
              className="pl-10 h-11 rounded-xl border border-slate-200 bg-white text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100">
                  <TableHead className="text-slate-600 font-semibold">Project</TableHead>
                  <TableHead className="text-slate-600 font-semibold">Team</TableHead>
                  <TableHead className="text-slate-600 font-semibold">Mentor</TableHead>
                  <TableHead className="text-slate-600 font-semibold">Progress</TableHead>
                  <TableHead className="text-slate-600 font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="border-slate-100 hover:bg-sky-50/30">
                    <TableCell className="font-bold text-slate-900">
                      {project.title}
                    </TableCell>

                    <TableCell className="font-medium text-slate-700">
                      {project.team}
                    </TableCell>

                    <TableCell className="text-slate-600 font-medium">
                      {project.mentor}
                    </TableCell>

                    <TableCell className="min-w-40">
                      <div className="flex items-center gap-3">
                        <Progress
                          value={project.progress}
                          className="w-20 h-2.5 bg-sky-50 border border-sky-100"
                        />

                        <span className="text-sm font-semibold text-slate-700">
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
                        className={project.status === "Approved" ? "bg-emerald-600 text-white" : "bg-sky-50 text-sky-700 border border-sky-200"}
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
                      className="h-32 text-center text-slate-400 font-medium"
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