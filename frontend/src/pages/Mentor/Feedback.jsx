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
    <div className="min-h-screen bg-sky-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <DashboardHeader
        title="Feedback"
        description="Provide feedback and suggestions to your assigned student teams."
      />

      {/* Top Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <MessageSquare size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                Total Feedback
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {feedbacks.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                Assigned Projects
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
                High Priority
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
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

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600 border border-sky-200">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                Teams Covered
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
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

      {/* Send Feedback & Selected Project Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Send Feedback</CardTitle>

            <CardDescription className="text-slate-500">
              Select a project and provide your feedback to the team.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Project</Label>

                <Select
                  value={selectedProjectId}
                  onValueChange={setSelectedProjectId}
                >
                  <SelectTrigger className="h-11 rounded-xl border border-slate-200 bg-white text-sm">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
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
                <Label className="text-sm font-semibold text-slate-700">Feedback Category</Label>

                <Select
                  value={category}
                  onValueChange={setCategory}
                >
                  <SelectTrigger className="h-11 rounded-xl border border-slate-200 bg-white text-sm">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
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
              <Label className="text-sm font-semibold text-slate-700">Priority</Label>

              <Select
                value={priority}
                onValueChange={setPriority}
              >
                <SelectTrigger className="h-11 rounded-xl border border-slate-200 bg-white text-sm">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
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
              <Label className="text-sm font-semibold text-slate-700">Feedback Message</Label>

              <Textarea
                placeholder="Write detailed feedback, suggestions and improvements..."
                className="min-h-36 rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 resize-none"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />
            </div>

            <Button
              className="w-full gap-2 bg-black hover:bg-zinc-900 text-white font-semibold h-11 shadow-md"
              onClick={handleSubmit}
            >
              <Send size={16} />
              Send Feedback
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Selected Project</CardTitle>

            <CardDescription className="text-slate-500">
              Current project information.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {!selectedProject ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-200 mb-3">
                  <FolderKanban size={24} />
                </div>

                <p className="font-bold text-slate-900 text-sm">
                  No Project Selected
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Select a project to view its details.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Project
                  </p>

                  <p className="font-bold text-slate-900 text-sm mt-0.5">
                    {selectedProject.title}
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
                  <div className="mb-2 flex justify-between items-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Progress
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

                <div>
                  <p className="mb-2.5 text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Team Members
                  </p>

                  <div className="space-y-2">
                    {selectedProject.students.map(
                      (student) => (
                        <div
                          key={student}
                          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3 shadow-2xs"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-600 border border-sky-200">
                            {student.charAt(0)}
                          </div>

                          <span className="font-semibold text-slate-800 text-sm">
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

      {/* Feedback History Section */}
      <Card className="border border-sky-100 bg-white shadow-xl">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="text-lg text-slate-900">Feedback History</CardTitle>

          <CardDescription className="text-slate-500">
            View all feedback previously provided to student teams.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="relative mb-6 max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <Input
              placeholder="Search feedback..."
              className="pl-10 h-11 rounded-xl border border-slate-200 bg-white text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:border-sky-200"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <p className="font-bold text-slate-900 text-base">
                        {feedback.project}
                      </p>

                      <Badge variant="secondary" className="bg-sky-50 text-sky-700 border border-sky-200 font-medium">
                        {feedback.category}
                      </Badge>

                      <Badge
                        variant={getPriorityVariant(
                          feedback.priority
                        )}
                        className={feedback.priority === "High" ? "bg-rose-500 text-white" : ""}
                      >
                        {feedback.priority} Priority
                      </Badge>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {feedback.message}
                    </p>

                    <p className="mt-3 text-xs text-slate-400 font-medium flex items-center gap-1.5">
                      <Clock size={14} />
                      {feedback.date}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      deleteFeedback(feedback.id)
                    }
                    className="h-9 w-9 text-slate-400 hover:text-rose-600 hover:bg-rose-50 shrink-0"
                  >
                    <Trash2 size={17} />
                  </Button>
                </div>
              </div>
            ))}

            {filteredFeedbacks.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-sm font-medium">
                No feedback found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}