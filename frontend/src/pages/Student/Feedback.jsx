import { useMemo, useState } from "react"

import {
  MessageSquare,
  Search,
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertCircle,
  UserRound,
  BellRing,
  Filter,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Feedback() {
  const [search, setSearch] = useState("")
  const [projectFilter, setProjectFilter] = useState("All")

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      project: "SmartEdu Platform",
      category: "Technical",
      priority: "High",
      message:
        "Please improve API error handling and complete the authentication integration before the next progress submission.",
      mentor: "Dr. Sharma",
      date: "Today",
      read: false,
    },
    {
      id: 2,
      project: "SmartEdu Platform",
      category: "UI/UX",
      priority: "Medium",
      message:
        "The dashboard design is progressing well. Improve mobile responsiveness and maintain consistent spacing across all pages.",
      mentor: "Dr. Sharma",
      date: "Yesterday",
      read: true,
    },
    {
      id: 3,
      project: "SmartEdu Platform",
      category: "Documentation",
      priority: "Low",
      message:
        "Add more details to the project documentation and clearly explain the selected technology stack and implementation approach.",
      mentor: "Dr. Sharma",
      date: "2 days ago",
      read: true,
    },
    {
      id: 4,
      project: "SmartEdu Platform",
      category: "Progress",
      priority: "Medium",
      message:
        "Your current milestone is on track. Focus on completing the remaining pending tasks before starting the next milestone.",
      mentor: "Dr. Sharma",
      date: "4 days ago",
      read: true,
    },
  ])

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((feedback) => {
      const matchesSearch =
        `${feedback.project} ${feedback.category} ${feedback.message} ${feedback.mentor}`
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesProject =
        projectFilter === "All" ||
        feedback.project === projectFilter

      return matchesSearch && matchesProject
    })
  }, [feedbacks, search, projectFilter])

  const unreadCount = feedbacks.filter(
    (feedback) => !feedback.read
  ).length

  const highPriorityCount = feedbacks.filter(
    (feedback) => feedback.priority === "High"
  ).length

  const markAsRead = (id) => {
    setFeedbacks((previousFeedbacks) =>
      previousFeedbacks.map((feedback) =>
        feedback.id === id
          ? { ...feedback, read: true }
          : feedback
      )
    )
  }

  const markAllAsRead = () => {
    setFeedbacks((previousFeedbacks) =>
      previousFeedbacks.map((feedback) => ({
        ...feedback,
        read: true,
      }))
    )
  }

  const getPriorityVariant = (priority) => {
    if (priority === "High") return "destructive"
    if (priority === "Low") return "secondary"
    return "default"
  }

  return (
    <div className="min-h-screen bg-sky-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <DashboardHeader
        title="Mentor Feedback"
        description="Review suggestions, improvement points and feedback shared by your mentor."
      />

      {/* Top Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-550 text-sky-600 bg-sky-50 border border-sky-200">
              <MessageSquare size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Feedback</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{feedbacks.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
              <FolderKanban size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Project</p>
              <p className="mt-1 text-base font-bold text-slate-900 truncate max-w-[160px]">SmartEdu Platform</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <BellRing size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Unread Feedback</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{unreadCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-md shadow-sky-100/50 transition-all hover:shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
              <AlertCircle size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">High Priority</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{highPriorityCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar Section */}
      <Card className="border border-sky-100 bg-white shadow-xl">
        <CardHeader className="pb-4 border-b border-slate-100">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle className="text-lg text-slate-900">Feedback History</CardTitle>
              <CardDescription className="mt-1 text-slate-500">
                Stay updated with mentor suggestions and project improvement points.
              </CardDescription>
            </div>

            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={markAllAsRead}
                className="gap-2 border-sky-200 bg-sky-50/50 text-sky-700 hover:bg-sky-100"
              >
                <CheckCircle2 size={16} />
                Mark All as Read
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                placeholder="Search feedback, category or mentor..."
                className="pl-10 h-11 rounded-xl border border-slate-200 bg-white text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter size={18} className="text-slate-400 hidden md:block" />
                <Select
                  value={projectFilter}
                  onValueChange={setProjectFilter}
                >
                  <SelectTrigger className="w-full md:w-56 h-11 rounded-xl border border-slate-200 bg-white text-sm">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                    <SelectItem value="All">All Projects</SelectItem>
                    <SelectItem value="SmartEdu Platform">SmartEdu Platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Feed List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((feedback) => (
          <Card
            key={feedback.id}
            className={`overflow-hidden transition-all border shadow-md ${
              !feedback.read
                ? "border-sky-300 bg-sky-50/30"
                : "border-sky-100 bg-white"
            }`}
          >
            <CardContent className="p-0">
              <div className="p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-5 lg:flex-row">
                  <div className="flex flex-1 gap-4">
                    <div
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                        feedback.read
                          ? "bg-slate-100 text-slate-500 border-slate-200"
                          : "bg-sky-50 text-sky-600 border-sky-200"
                      }`}
                    >
                      <MessageSquare size={19} />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-slate-900">
                          {feedback.project}
                        </h3>

                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 border border-slate-200">
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

                        {!feedback.read && (
                          <Badge
                            variant="outline"
                            className="border-sky-300 bg-sky-50 text-sky-700 font-semibold"
                          >
                            New
                          </Badge>
                        )}
                      </div>

                      <p className="mt-3 max-w-3xl leading-relaxed text-slate-600 text-sm">
                        {feedback.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 lg:items-start bg-slate-50/60 p-3.5 rounded-xl border border-slate-100 lg:bg-transparent lg:p-0 lg:border-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100/60 text-sky-700 border border-sky-200">
                      <UserRound size={19} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {feedback.mentor}
                      </p>
                      <p className="text-xs text-slate-500">
                        Project Mentor
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <Clock size={15} />
                    Received {feedback.date}
                  </div>

                  {!feedback.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        markAsRead(feedback.id)
                      }
                      className="gap-2 border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100"
                    >
                      <CheckCircle2 size={16} />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredFeedbacks.length === 0 && (
          <Card className="border border-sky-100 bg-white shadow-xl">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 border border-sky-200 text-sky-600">
                <MessageSquare size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No Feedback Found
              </h3>

              <p className="mt-2 max-w-sm text-sm text-slate-500">
                No mentor feedback matches your current search or selected project.
              </p>

              <Button
                variant="outline"
                className="mt-5 border-slate-200 text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  setSearch("")
                  setProjectFilter("All")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}