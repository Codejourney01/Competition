import { useMemo, useState } from "react"
import {
  Search,
  FolderKanban,
  Clock,
  CheckCircle2,
  Eye,
  ClipboardCheck,
  Users,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import DashboardHeader from "@/components/DashboardHeader"
import StatusBadge from "@/components/StatusBadge"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function AssignedProjects() {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "SmartEdu Platform",
      domain: "Education",
      team: "Team Alpha",
      students: ["Vishu", "Rahul", "Aman"],
      progress: 65,
      status: "Active",
      lastUpdate: "2 hours ago",
      description:
        "A smart education platform for managing students, learning resources and academic progress.",
      technology: "React, Node.js, MongoDB",
    },
    {
      id: 2,
      title: "HealthTrack",
      domain: "Healthcare",
      team: "Team Beta",
      students: ["Priya", "Karan", "Neha"],
      progress: 40,
      status: "Under Review",
      lastUpdate: "Yesterday",
      description:
        "A healthcare platform for monitoring activities and managing health information.",
      technology: "React, Express, MongoDB",
    },
    {
      id: 3,
      title: "CareerConnect",
      domain: "Career",
      team: "Team Delta",
      students: ["Karan", "Vivek", "Sneha"],
      progress: 85,
      status: "Active",
      lastUpdate: "3 days ago",
      description:
        "A career guidance platform connecting students with mentors and career opportunities.",
      technology: "React, Node.js",
    },
  ]

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        `${project.title} ${project.team} ${project.domain}`
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesStatus =
        status === "All" || project.status === status

      return matchesSearch && matchesStatus
    })
  }, [search, status])

  const activeProjects = projects.filter(
    (project) => project.status === "Active"
  ).length

  const underReviewProjects = projects.filter(
    (project) => project.status === "Under Review"
  ).length

  const averageProgress = Math.round(
    projects.reduce(
      (total, project) => total + project.progress,
      0
    ) / projects.length
  )

  return (
    <div className="min-h-screen bg-sky-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <DashboardHeader
        title="Assigned Projects"
        description="Review and monitor projects assigned to you."
      />

      {/* Top Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                Total Assigned
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {projects.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <Clock size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                Under Review
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {underReviewProjects}
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
                Active Projects
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {activeProjects}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <ClipboardCheck size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                Avg. Progress
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {averageProgress}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border border-sky-100 bg-white shadow-xl">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <Input
                placeholder="Search assigned projects..."
                className="pl-10 h-11 rounded-xl border border-slate-200 bg-white text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger className="w-full md:w-48 h-11 rounded-xl border border-slate-200 bg-white text-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                <SelectItem value="All">
                  All Projects
                </SelectItem>

                <SelectItem value="Active">
                  Active
                </SelectItem>

                <SelectItem value="Under Review">
                  Under Review
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Project Table Card */}
      <Card className="border border-sky-100 bg-white shadow-xl">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="text-lg text-slate-900">Project List</CardTitle>

          <CardDescription className="text-slate-500">
            All student projects currently assigned for mentoring.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100">
                  <TableHead className="text-slate-600 font-semibold">Project</TableHead>
                  <TableHead className="text-slate-600 font-semibold">Team</TableHead>
                  <TableHead className="text-slate-600 font-semibold">Students</TableHead>
                  <TableHead className="text-slate-600 font-semibold">Progress</TableHead>
                  <TableHead className="text-slate-600 font-semibold">Last Update</TableHead>
                  <TableHead className="text-slate-600 font-semibold">Status</TableHead>
                  <TableHead className="text-right text-slate-600 font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="border-slate-100 hover:bg-sky-50/30">
                    <TableCell>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {project.title}
                        </p>

                        <p className="text-xs text-slate-400 font-medium">
                          {project.domain}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium text-slate-700">
                      {project.team}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
                        <Users size={15} className="text-sky-600" />
                        {project.students.length}
                      </div>
                    </TableCell>

                    <TableCell className="min-w-36">
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

                    <TableCell className="text-slate-500 text-sm">
                      {project.lastUpdate}
                    </TableCell>

                    <TableCell>
                      <StatusBadge status={project.status} />
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setSelectedProject(project)
                          }
                          className="gap-1.5 border-slate-200 bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700 h-9"
                        >
                          <Eye size={15} />
                          View
                        </Button>

                        <Button
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/mentor/project-review?id=${project.id}`
                            )
                          }
                          className="gap-1.5 bg-black hover:bg-zinc-900 text-white h-9 shadow-2xs font-semibold"
                        >
                          <ClipboardCheck size={15} />
                          Review
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredProjects.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-slate-400"
                    >
                      No assigned projects found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Project Details Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null)
        }}
      >
        <DialogContent className="sm:max-w-xl rounded-2xl border border-sky-100 bg-white p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              {selectedProject?.title}
            </DialogTitle>

            <DialogDescription className="text-slate-500">
              Project details and student team information.
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-5 pt-2">
              <div className="grid gap-4 sm:grid-cols-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Domain
                  </p>

                  <p className="font-semibold text-slate-800 text-sm mt-0.5">
                    {selectedProject.domain}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Team
                  </p>

                  <p className="font-semibold text-slate-800 text-sm mt-0.5">
                    {selectedProject.team}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Status
                  </p>

                  <div className="mt-1">
                    <StatusBadge
                      status={selectedProject.status}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Last Update
                  </p>

                  <p className="font-semibold text-slate-800 text-sm mt-0.5">
                    {selectedProject.lastUpdate}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                  Description
                </p>

                <p className="text-sm leading-relaxed text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                  Technology Stack
                </p>

                <p className="font-semibold text-slate-800 text-sm bg-white p-3.5 rounded-xl border border-slate-200">
                  {selectedProject.technology}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Team Members
                </p>

                <div className="space-y-2">
                  {selectedProject.students.map(
                    (student) => (
                      <div
                        key={student}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-2xs"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-600 border border-sky-200">
                          {student.charAt(0)}
                        </div>

                        <p className="font-semibold text-slate-800 text-sm">
                          {student}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between items-center">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Overall Progress
                  </p>

                  <p className="text-sm font-bold text-sky-600">
                    {selectedProject.progress}%
                  </p>
                </div>

                <Progress
                  value={selectedProject.progress}
                  className="h-2.5 bg-sky-50 border border-sky-100"
                />
              </div>

              <Button
                className="w-full gap-2 bg-black hover:bg-zinc-900 text-white font-semibold h-11 shadow-md"
                onClick={() => {
                  setSelectedProject(null)
                  navigate(
                    `/mentor/project-review?id=${selectedProject.id}`
                  )
                }}
              >
                <ClipboardCheck size={16} />
                Review This Project
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}