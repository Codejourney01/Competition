import { useMemo, useState } from "react"
import {
  MessageSquare,
  Send,
  FolderKanban,
  Users,
  Clock,
  CheckCircle2,
  Search,
  Trash2,
} from "lucide-react"

import DashboardHeader from "@/components/DashboardHeader"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export default function Feedback() {
  const projects = [
    {
      id: "1",
      title: "SmartEdu Platform",
      team: "Team Alpha",
      students: ["Vishu", "Rahul", "Aman"],
      progress: 65,
    },
    {
      id: "2",
      title: "HealthTrack",
      team: "Team Beta",
      students: ["Priya", "Karan", "Neha"],
      progress: 40,
    },
    {
      id: "3",
      title: "CareerConnect",
      team: "Team Delta",
      students: ["Karan", "Vivek", "Sneha"],
      progress: 85,
    },
  ]

  const [selectedProjectId, setSelectedProjectId] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      project: "SmartEdu Platform",
      category: "Technical",
      priority: "High",
      message:
        "Please improve API error handling and complete authentication integration.",
      date: "Today",
    },
    {
      id: 2,
      project: "HealthTrack",
      category: "UI/UX",
      priority: "Medium",
      message:
        "The dashboard layout is good. Improve mobile responsiveness.",
      date: "Yesterday",
    },
  ])

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  )

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((feedback) =>
      `${feedback.project} ${feedback.category} ${feedback.message}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [feedbacks, search])

  const handleSubmit = () => {
    if (!selectedProjectId || !category || !message.trim()) {
      alert("Please complete all required fields")
      return
    }

    const newFeedback = {
      id: Date.now(),
      project: selectedProject.title,
      category,
      priority,
      message,
      date: "Just now",
    }

    setFeedbacks([newFeedback, ...feedbacks])

    setCategory("")
    setPriority("Medium")
    setMessage("")
    setSelectedProjectId("")
  }

  const deleteFeedback = (id) => {
    setFeedbacks(
      feedbacks.filter((feedback) => feedback.id !== id)
    )
  }

  const getPriorityVariant = (value) => {
    if (value === "High") return "destructive"
    if (value === "Low") return "secondary"
    return "default"
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Feedback"
        description="Provide feedback and suggestions to your assigned student teams."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <MessageSquare size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Feedback
              </p>

              <p className="text-2xl font-bold">
                {feedbacks.length}
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
                Assigned Projects
              </p>

              <p className="text-2xl font-bold">
                {projects.length}
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
                High Priority
              </p>

              <p className="text-2xl font-bold">
                {
                  feedbacks.filter(
                    (feedback) =>
                      feedback.priority === "High"
                  ).length
                }
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
                Teams Covered
              </p>

              <p className="text-2xl font-bold">
                {
                  new Set(
                    feedbacks.map(
                      (feedback) => feedback.project
                    )
                  ).size
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Send Feedback</CardTitle>

            <CardDescription>
              Select a project and provide your feedback to the team.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Project</Label>

                <Select
                  value={selectedProjectId}
                  onValueChange={setSelectedProjectId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>

                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem
                        key={project.id}
                        value={project.id}
                      >
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Feedback Category</Label>

                <Select
                  value={category}
                  onValueChange={setCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Technical">
                      Technical
                    </SelectItem>

                    <SelectItem value="UI/UX">
                      UI/UX
                    </SelectItem>

                    <SelectItem value="Functionality">
                      Functionality
                    </SelectItem>

                    <SelectItem value="Documentation">
                      Documentation
                    </SelectItem>

                    <SelectItem value="General">
                      General
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>

              <Select
                value={priority}
                onValueChange={setPriority}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="High">
                    High Priority
                  </SelectItem>

                  <SelectItem value="Medium">
                    Medium Priority
                  </SelectItem>

                  <SelectItem value="Low">
                    Low Priority
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Feedback Message</Label>

              <Textarea
                placeholder="Write detailed feedback, suggestions and improvements..."
                className="min-h-36"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />
            </div>

            <Button
              className="w-full"
              onClick={handleSubmit}
            >
              <Send />
              Send Feedback
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Selected Project</CardTitle>

            <CardDescription>
              Current project information.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!selectedProject ? (
              <div className="flex min-h-52 flex-col items-center justify-center text-center">
                <FolderKanban
                  size={32}
                  className="mb-3 text-muted-foreground"
                />

                <p className="font-medium">
                  No Project Selected
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Select a project to view its details.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Project
                  </p>

                  <p className="font-semibold">
                    {selectedProject.title}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Team
                  </p>

                  <p className="font-semibold">
                    {selectedProject.team}
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <p className="text-sm text-muted-foreground">
                      Progress
                    </p>

                    <p className="text-sm font-medium">
                      {selectedProject.progress}%
                    </p>
                  </div>

                  <Progress
                    value={selectedProject.progress}
                  />
                </div>

                <div>
                  <p className="mb-3 text-sm text-muted-foreground">
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

                          <span className="font-medium">
                            {student}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedback History</CardTitle>

          <CardDescription>
            View all feedback previously provided to student teams.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative mb-5 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Search feedback..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="rounded-lg border p-4"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">
                        {feedback.project}
                      </p>

                      <Badge variant="secondary">
                        {feedback.category}
                      </Badge>

                      <Badge
                        variant={getPriorityVariant(
                          feedback.priority
                        )}
                      >
                        {feedback.priority}
                      </Badge>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {feedback.message}
                    </p>

                    <p className="mt-3 text-xs text-muted-foreground">
                      {feedback.date}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      deleteFeedback(feedback.id)
                    }
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}

            {filteredFeedbacks.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No feedback found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}