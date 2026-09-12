import { useState } from "react"
import {
  FileText,
  CheckCircle2,
  CircleDot,
  CalendarDays,
  Plus,
  Trash2,
  Send,
  AlertCircle,
  Clock,
} from "lucide-react"

import DashboardHeader from "@/components/DashboardHeader"
import StatusBadge from "@/components/StatusBadge"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SubmitProgress() {
  const [progress, setProgress] = useState(65)
  const [summary, setSummary] = useState("")
  const [challenge, setChallenge] = useState("")
  const [nextSteps, setNextSteps] = useState("")
  const [taskInput, setTaskInput] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const [completedTasks, setCompletedTasks] = useState([
    "Project UI design completed",
    "Student dashboard completed",
    "Project database structure created",
  ])

  const project = {
    title: "SmartEdu Platform",
    status: "Active",
    previousProgress: 65,
    deadline: "30 September 2026",
  }

  const addTask = () => {
    const value = taskInput.trim()

    if (!value) return

    if (completedTasks.includes(value)) return

    setCompletedTasks([...completedTasks, value])
    setTaskInput("")
    setSubmitted(false)
  }

  const removeTask = (taskToRemove) => {
    setCompletedTasks(
      completedTasks.filter(
        (task) => task !== taskToRemove
      )
    )

    setSubmitted(false)
  }

  const handleSubmit = () => {
    if (!summary.trim()) {
      alert("Please enter your work summary")
      return
    }

    if (completedTasks.length === 0) {
      alert("Please add at least one completed task")
      return
    }

    setSubmitted(true)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Submit Progress"
        description="Submit your latest project progress for mentor review."
      />

      {submitted && (
        <Card className="border-green-500">
          <CardContent className="flex items-start gap-4 p-5">
            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="font-semibold">
                Progress Submitted Successfully
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Your progress submission has been sent to your mentor
                for review and feedback.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Current Project</CardTitle>

            <CardDescription>
              Project information for this progress submission.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold">
                    {project.title}
                  </h2>

                  <StatusBadge status={project.status} />
                </div>

                <p className="text-sm text-muted-foreground">
                  Submit your latest completed work and update your
                  project progress.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-lg border px-4 py-3">
                <CalendarDays
                  size={19}
                  className="text-muted-foreground"
                />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Deadline
                  </p>

                  <p className="text-sm font-semibold">
                    {project.deadline}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission Status</CardTitle>

            <CardDescription>
              Current progress information.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Previous Progress
              </p>

              <p className="mt-1 text-2xl font-bold">
                {project.previousProgress}%
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Current Progress
              </p>

              <p className="mt-1 text-2xl font-bold">
                {progress}%
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              {submitted ? (
                <>
                  <CheckCircle2
                    size={18}
                    className="text-green-600"
                  />

                  <span className="font-medium text-green-600">
                    Submitted for Review
                  </span>
                </>
              ) : (
                <>
                  <Clock
                    size={18}
                    className="text-orange-500"
                  />

                  <span className="font-medium text-orange-500">
                    Draft
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleDot size={20} />
            Update Project Progress
          </CardTitle>

          <CardDescription>
            Set your current project completion percentage.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Input
              type="number"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => {
                const value = Math.max(
                  0,
                  Math.min(100, Number(e.target.value))
                )

                setProgress(value)
                setSubmitted(false)
              }}
              className="sm:max-w-40"
            />

            <span className="text-sm text-muted-foreground">
              Enter a value between 0 and 100
            </span>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-medium">
                Current Completion
              </p>

              <p className="font-bold">
                {progress}%
              </p>
            </div>

            <Progress
              value={progress}
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            Work Summary
          </CardTitle>

          <CardDescription>
            Explain what your team has completed since the last update.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Textarea
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value)
              setSubmitted(false)
            }}
            placeholder="Describe the work completed, important changes, features developed and overall progress..."
            className="min-h-40"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>

          <CardDescription>
            Add the tasks completed by your team.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Enter completed task"
              value={taskInput}
              onChange={(e) =>
                setTaskInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTask()
                }
              }}
            />

            <Button
              type="button"
              onClick={addTask}
            >
              <Plus size={18} />
              Add Task
            </Button>
          </div>

          <div className="space-y-3">
            {completedTasks.map((task, index) => (
              <div
                key={`${task}-${index}`}
                className="flex items-center justify-between gap-4 rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 size={17} />
                  </div>

                  <p className="font-medium">
                    {task}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTask(task)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle size={20} />
              Challenges or Issues
            </CardTitle>

            <CardDescription>
              Mention any problems currently affecting the project.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Textarea
              value={challenge}
              onChange={(e) => {
                setChallenge(e.target.value)
                setSubmitted(false)
              }}
              placeholder="Example: API integration is taking more time than expected..."
              className="min-h-36"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>

            <CardDescription>
              Describe what your team plans to work on next.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Textarea
              value={nextSteps}
              onChange={(e) => {
                setNextSteps(e.target.value)
                setSubmitted(false)
              }}
              placeholder="Example: Complete authentication and start testing the application..."
              className="min-h-36"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleSubmit}
        >
          <Send />
          Submit Progress
        </Button>
      </div>
    </div>
  )
}