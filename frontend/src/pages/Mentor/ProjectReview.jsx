import { useState } from "react"
import {
  ClipboardCheck,
  FolderKanban,
  Users,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
} from "lucide-react"

import DashboardHeader from "@/components/DashboardHeader"
import StatusBadge from "@/components/StatusBadge"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function ProjectReview() {
  const projects = [
    {
      id: "1",
      title: "SmartEdu Platform",
      domain: "Education",
      team: "Team Alpha",
      students: ["Vishu", "Rahul", "Aman"],
      progress: 65,
      status: "Active",
      submittedDate: "12 September 2026",
      description:
        "A smart education platform designed to help students manage courses, assignments, learning progress and academic resources.",
      technology: ["React", "Node.js", "Express", "MongoDB"],
      submission: "Week 6 Progress Report",
    },
    {
      id: "2",
      title: "HealthTrack",
      domain: "Healthcare",
      team: "Team Beta",
      students: ["Priya", "Karan", "Neha"],
      progress: 40,
      status: "Under Review",
      submittedDate: "11 September 2026",
      description:
        "A healthcare management platform for tracking health information and user activities.",
      technology: ["React", "Express", "MongoDB"],
      submission: "Project Progress Update",
    },
    {
      id: "3",
      title: "CareerConnect",
      domain: "Career",
      team: "Team Delta",
      students: ["Karan", "Vivek", "Sneha"],
      progress: 85,
      status: "Active",
      submittedDate: "9 September 2026",
      description:
        "A career guidance and opportunity platform connecting students with career resources.",
      technology: ["React", "Node.js"],
      submission: "Milestone 3 Submission",
    },
  ]

  const [selectedProjectId, setSelectedProjectId] = useState("")
  const [reviewStatus, setReviewStatus] = useState("")
  const [comments, setComments] = useState("")
  const [reviewed, setReviewed] = useState(false)

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  )

  const handleProjectChange = (value) => {
    setSelectedProjectId(value)
    setReviewStatus("")
    setComments("")
    setReviewed(false)
  }

  const handleReview = (status) => {
    if (!selectedProject) {
      alert("Please select a project")
      return
    }

    if (!comments.trim()) {
      alert("Please add review comments")
      return
    }

    setReviewStatus(status)
    setReviewed(true)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Project Review"
        description="Review student project submissions and provide guidance."
      />

      <Card>
        <CardHeader>
          <CardTitle>Select Project</CardTitle>

          <CardDescription>
            Choose an assigned project to review its latest submission.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Select
            value={selectedProjectId}
            onValueChange={handleProjectChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an assigned project" />
            </SelectTrigger>

            <SelectContent>
              {projects.map((project) => (
                <SelectItem
                  key={project.id}
                  value={project.id}
                >
                  {project.title} - {project.team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {!selectedProject && (
        <Card>
          <CardContent className="flex min-h-80 flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
              <ClipboardCheck size={30} />
            </div>

            <h3 className="text-lg font-semibold">
              Select a Project to Review
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Choose one of your assigned projects to view its
              progress, submission details and team information.
            </p>
          </CardContent>
        </Card>
      )}

      {selectedProject && (
        <>
          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <CardTitle>
                      {selectedProject.title}
                    </CardTitle>

                    <CardDescription>
                      {selectedProject.domain}
                    </CardDescription>
                  </div>

                  <StatusBadge
                    status={selectedProject.status}
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Project Description
                  </p>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <FolderKanban size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Team
                      </p>

                      <p className="font-semibold">
                        {selectedProject.team}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                      <Calendar size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Submitted
                      </p>

                      <p className="font-semibold">
                        {selectedProject.submittedDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium">
                      Project Progress
                    </p>

                    <p className="text-sm font-semibold">
                      {selectedProject.progress}%
                    </p>
                  </div>

                  <Progress
                    value={selectedProject.progress}
                  />
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium">
                    Technology Stack
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technology.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>

                <CardDescription>
                  Students working on this project.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {selectedProject.students.map((student) => (
                  <div
                    key={student}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {student.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium">
                        {student}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Team Member
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={20} />
                Latest Submission
              </CardTitle>

              <CardDescription>
                Review the latest work submitted by the student team.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col justify-between gap-4 rounded-lg border p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold">
                    {selectedProject.submission}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Submitted on {selectedProject.submittedDate}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className="w-fit"
                >
                  Pending Review
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review & Feedback</CardTitle>

              <CardDescription>
                Provide comments and choose the review result.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Review Comments</Label>

                <Textarea
                  placeholder="Write your review comments, suggestions and required improvements..."
                  className="min-h-40"
                  value={comments}
                  onChange={(e) => {
                    setComments(e.target.value)
                    setReviewed(false)
                  }}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleReview("Changes Requested")
                  }
                >
                  <AlertCircle />
                  Request Changes
                </Button>

                <Button
                  onClick={() =>
                    handleReview("Approved")
                  }
                >
                  <CheckCircle2 />
                  Approve Review
                </Button>
              </div>
            </CardContent>
          </Card>

          {reviewed && (
            <Card>
              <CardContent className="flex items-start gap-4 p-5">
                <div
                  className={`rounded-full p-3 ${
                    reviewStatus === "Approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {reviewStatus === "Approved" ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <AlertCircle size={24} />
                  )}
                </div>

                <div>
                  <p className="font-semibold">
                    Review Submitted
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedProject.title} has been marked as{" "}
                    <span className="font-medium">
                      {reviewStatus}
                    </span>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedProjectId("")
                setReviewStatus("")
                setComments("")
                setReviewed(false)
              }}
            >
              <Send />
              Review Another Project
            </Button>
          </div>
        </>
      )}
    </div>
  )
}