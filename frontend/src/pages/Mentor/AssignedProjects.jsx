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
    <div className="space-y-6">
      <DashboardHeader
        title="Assigned Projects"
        description="Review and monitor projects assigned to you."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Assigned
              </p>

              <p className="text-2xl font-bold">
                {projects.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <Clock size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Under Review
              </p>

              <p className="text-2xl font-bold">
                {underReviewProjects}
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
                Active Projects
              </p>

              <p className="text-2xl font-bold">
                {activeProjects}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <ClipboardCheck size={22} />
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
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                placeholder="Search assigned projects..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>

              <SelectContent>
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

      <Card>
        <CardHeader>
          <CardTitle>Project List</CardTitle>

          <CardDescription>
            All student projects currently assigned for mentoring.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {project.title}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {project.domain}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      {project.team}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        {project.students.length}
                      </div>
                    </TableCell>

                    <TableCell className="min-w-36">
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
                        >
                          <Eye />
                          View
                        </Button>

                        <Button
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/mentor/project-review?id=${project.id}`
                            )
                          }
                        >
                          <ClipboardCheck />
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
                      className="h-32 text-center text-muted-foreground"
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

      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null)
        }}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProject?.title}
            </DialogTitle>

            <DialogDescription>
              Project details and student team information.
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Domain
                  </p>

                  <p className="font-medium">
                    {selectedProject.domain}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Team
                  </p>

                  <p className="font-medium">
                    {selectedProject.team}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Status
                  </p>

                  <div className="mt-1">
                    <StatusBadge
                      status={selectedProject.status}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Last Update
                  </p>

                  <p className="font-medium">
                    {selectedProject.lastUpdate}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Technology Stack
                </p>

                <p className="mt-1 font-medium">
                  {selectedProject.technology}
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium">
                  Team Members
                </p>

                <div className="space-y-2">
                  {selectedProject.students.map(
                    (student) => (
                      <div
                        key={student}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {student.charAt(0)}
                        </div>

                        <p className="font-medium">
                          {student}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <p className="text-sm font-medium">
                    Overall Progress
                  </p>

                  <p className="text-sm">
                    {selectedProject.progress}%
                  </p>
                </div>

                <Progress
                  value={selectedProject.progress}
                />
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  setSelectedProject(null)
                  navigate(
                    `/mentor/project-review?id=${selectedProject.id}`
                  )
                }}
              >
                <ClipboardCheck />
                Review This Project
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}