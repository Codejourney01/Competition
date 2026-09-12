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
    <div className="space-y-6">
      <DashboardHeader
        title="Mentor Feedback"
        description="Review suggestions, improvement points and feedback shared by your mentor."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessageSquare size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Feedback
              </p>

              <p className="mt-1 text-2xl font-bold">
                {feedbacks.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Active Project
              </p>

              <p className="mt-1 text-lg font-bold">
                SmartEdu Platform
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <BellRing size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Unread Feedback
              </p>

              <p className="mt-1 text-2xl font-bold">
                {unreadCount}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertCircle size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                High Priority
              </p>

              <p className="mt-1 text-2xl font-bold">
                {highPriorityCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle>Feedback History</CardTitle>

              <CardDescription className="mt-1">
                Stay updated with mentor suggestions and project improvement points.
              </CardDescription>
            </div>

            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={markAllAsRead}
              >
                <CheckCircle2 />
                Mark All as Read
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                placeholder="Search feedback, category or mentor..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <Filter
                  size={18}
                  className="text-muted-foreground"
                />

                <Select
                  value={projectFilter}
                  onValueChange={setProjectFilter}
                >
                  <SelectTrigger className="w-full md:w-56">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="All">
                      All Projects
                    </SelectItem>

                    <SelectItem value="SmartEdu Platform">
                      SmartEdu Platform
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredFeedbacks.map((feedback) => (
          <Card
            key={feedback.id}
            className={`overflow-hidden transition-all hover:shadow-md ${
              !feedback.read
                ? "border-primary/40 bg-primary/[0.02]"
                : ""
            }`}
          >
            <CardContent className="p-0">
              <div className="p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-5 lg:flex-row">
                  <div className="flex flex-1 gap-4">
                    <div
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        feedback.read
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <MessageSquare size={19} />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">
                          {feedback.project}
                        </h3>

                        <Badge variant="secondary">
                          {feedback.category}
                        </Badge>

                        <Badge
                          variant={getPriorityVariant(
                            feedback.priority
                          )}
                        >
                          {feedback.priority} Priority
                        </Badge>

                        {!feedback.read && (
                          <Badge
                            variant="outline"
                            className="border-primary/30 text-primary"
                          >
                            New
                          </Badge>
                        )}
                      </div>

                      <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                        {feedback.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 lg:items-start">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <UserRound size={19} />
                    </div>

                    <div>
                      <p className="font-medium">
                        {feedback.mentor}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Project Mentor
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col justify-between gap-4 border-t pt-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={16} />
                    Received {feedback.date}
                  </div>

                  {!feedback.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        markAsRead(feedback.id)
                      }
                    >
                      <CheckCircle2 />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredFeedbacks.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <MessageSquare
                  size={30}
                  className="text-muted-foreground"
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                No Feedback Found
              </h3>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                No mentor feedback matches your current search or selected project.
              </p>

              <Button
                variant="outline"
                className="mt-5"
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