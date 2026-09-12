import { useMemo, useState } from "react"
import {
  Search,
  FolderKanban,
  Clock,
  CheckCircle2,
  CircleAlert,
  Eye,
  UserPlus,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import DashboardHeader from "@/components/DashboardHeader"
import StatusBadge from "@/components/StatusBadge"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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

export default function Projects() {
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
      mentor: "Dr. Sharma",
      progress: 65,
      status: "Active",
      description:
        "A smart education platform for managing students, learning resources and academic progress.",
      technology: "React, Node.js, MongoDB",
    },
    {
      id: 2,
      title: "HealthTrack",
      domain: "Healthcare",
      team: "Team Beta",
      mentor: "Dr. Mehta",
      progress: 40,
      status: "Under Review",
      description:
        "A healthcare monitoring platform for tracking health activities and reports.",
      technology: "React, Express, MongoDB",
    },
    {
      id: 3,
      title: "EcoVision",
      domain: "Environment",
      team: "Team Gamma",
      mentor: "",
      progress: 20,
      status: "Pending",
      description:
        "A platform focused on environmental awareness and sustainable practices.",
      technology: "React, Firebase",
    },
    {
      id: 4,
      title: "CareerConnect",
      domain: "Career",
      team: "Team Delta",
      mentor: "Dr. Patel",
      progress: 85,
      status: "Approved",
      description:
        "A career guidance platform connecting students with mentors and opportunities.",
      technology: "React, Node.js",
    },
    {
      id: 5,
      title: "FarmAssist",
      domain: "Agriculture",
      team: "Team Epsilon",
      mentor: "",
      progress: 10,
      status: "Pending",
      description:
        "A digital platform designed to help farmers manage information and resources.",
      technology: "React, MongoDB",
    },
  ]

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        `${project.title} ${project.team} ${project.domain} ${project.mentor}`
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesStatus =
        status === "All" || project.status === status

      return matchesSearch && matchesStatus
    })
  }, [search, status])

  const totalProjects = projects.length

  const activeProjects = projects.filter(
    (project) => project.status === "Active"
  ).length

  const pendingProjects = projects.filter(
    (project) => project.status === "Pending"
  ).length

  const completedProjects = projects.filter(
    (project) =>
      project.status === "Approved" ||
      project.status === "Completed"
  ).length

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Projects"
        description="Manage and monitor all student projects."
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
              <FolderKanban size={22} />
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
            <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600">
              <Clock size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Pending Projects
              </p>

              <p className="text-2xl font-bold">
                {pendingProjects}
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
                Approved
              </p>

              <p className="text-2xl font-bold">
                {completedProjects}
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
                placeholder="Search projects, teams or mentors..."
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
                  All Status
                </SelectItem>

                <SelectItem value="Pending">
                  Pending
                </SelectItem>

                <SelectItem value="Active">
                  Active
                </SelectItem>

                <SelectItem value="Under Review">
                  Under Review
                </SelectItem>

                <SelectItem value="Approved">
                  Approved
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Progress</TableHead>
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
                      {project.mentor || (
                        <span className="text-muted-foreground">
                          Not Assigned
                        </span>
                      )}
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

                        {!project.mentor && (
                          <Button
                            size="sm"
                            onClick={() =>
                              navigate(
                                "/admin/assign-mentor"
                              )
                            }
                          >
                            <UserPlus />
                            Assign
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredProjects.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-32 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <CircleAlert size={22} />
                        No projects found.
                      </div>
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
              Complete project information and current progress.
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
                    Mentor
                  </p>

                  <p className="font-medium">
                    {selectedProject.mentor ||
                      "Not Assigned"}
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
                <div className="mb-2 flex justify-between">
                  <p className="text-sm font-medium">
                    Project Progress
                  </p>

                  <p className="text-sm">
                    {selectedProject.progress}%
                  </p>
                </div>

                <Progress
                  value={selectedProject.progress}
                />
              </div>

              {!selectedProject.mentor && (
                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedProject(null)
                    navigate("/admin/assign-mentor")
                  }}
                >
                  <UserPlus />
                  Assign Mentor
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}