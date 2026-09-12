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
    <div className="min-h-screen bg-sky-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <DashboardHeader
        title="Submit Progress"
        description="Submit your latest project progress for mentor review."
      />

      {submitted && (
        <Card className="border border-emerald-200 bg-emerald-50 shadow-md animate-in fade-in-50">
          <CardContent className="flex items-start gap-4 p-5">
            <div className="rounded-full bg-emerald-500 p-3 text-white shadow-md shadow-emerald-500/20">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="font-semibold text-emerald-800">
                Progress Submitted Successfully
              </p>

              <p className="mt-1 text-sm text-emerald-700">
                Your progress submission has been sent to your mentor
                for review and feedback.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Current Project</CardTitle>

            <CardDescription className="text-slate-500">
              Project information for this progress submission.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2.5">
                  <h2 className="text-xl font-bold text-slate-900">
                    {project.title}
                  </h2>

                  <StatusBadge status={project.status} />
                </div>

                <p className="text-sm text-slate-500">
                  Submit your latest completed work and update your
                  project progress.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3">
                <CalendarDays
                  size={19}
                  className="text-sky-600"
                />

                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    Deadline
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {project.deadline}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Submission Status</CardTitle>

            <CardDescription className="text-slate-500">
              Current progress information.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 pt-6">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Previous Progress
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-700">
                {project.previousProgress}%
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Current Progress
              </p>

              <p className="mt-1 text-2xl font-bold text-sky-600">
                {progress}%
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm pt-2 border-t border-slate-100">
              {submitted ? (
                <>
                  <CheckCircle2
                    size={18}
                    className="text-emerald-600"
                  />

                  <span className="font-semibold text-emerald-600">
                    Submitted for Review
                  </span>
                </>
              ) : (
                <>
                  <Clock
                    size={18}
                    className="text-amber-500"
                  />

                  <span className="font-semibold text-amber-500">
                    Draft
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-sky-100 bg-white shadow-xl">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
            <CircleDot size={20} className="text-sky-600" />
            Update Project Progress
          </CardTitle>

          <CardDescription className="text-slate-500">
            Set your current project completion percentage.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
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
              className="sm:max-w-40 h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />

            <span className="text-sm text-slate-500">
              Enter a value between 0 and 100
            </span>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-slate-700">
                Current Completion
              </p>

              <p className="font-bold text-sky-600">
                {progress}%
              </p>
            </div>

            <Progress
              value={progress}
              className="h-3 bg-sky-50 border border-sky-100"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-sky-100 bg-white shadow-xl">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
            <FileText size={20} className="text-sky-600" />
            Work Summary
          </CardTitle>

          <CardDescription className="text-slate-500">
            Explain what your team has completed since the last update.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Textarea
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value)
              setSubmitted(false)
            }}
            placeholder="Describe the work completed, important changes, features developed and overall progress..."
            className="min-h-40 rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 resize-none"
          />
        </CardContent>
      </Card>

      <Card className="border border-sky-100 bg-white shadow-xl">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="text-lg text-slate-900">Completed Tasks</CardTitle>

          <CardDescription className="text-slate-500">
            Add the tasks completed by your team.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
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
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />

            <Button
              type="button"
              onClick={addTask}
              className="h-11 shrink-0 px-5 gap-2 bg-black hover:bg-zinc-900 text-white font-semibold shadow-md"
            >
              <Plus size={16} />
              Add Task
            </Button>
          </div>

          <div className="space-y-3">
            {completedTasks.map((task, index) => (
              <div
                key={`${task}-${index}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold">
                    <CheckCircle2 size={16} />
                  </div>

                  <p className="font-medium text-slate-800 text-sm">
                    {task}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTask(task)}
                  className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <AlertCircle size={20} className="text-sky-600" />
              Challenges or Issues
            </CardTitle>

            <CardDescription className="text-slate-500">
              Mention any problems currently affecting the project.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Textarea
              value={challenge}
              onChange={(e) => {
                setChallenge(e.target.value)
                setSubmitted(false)
              }}
              placeholder="Example: API integration is taking more time than expected..."
              className="min-h-36 rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 resize-none"
            />
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Next Steps</CardTitle>

            <CardDescription className="text-slate-500">
              Describe what your team plans to work on next.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Textarea
              value={nextSteps}
              onChange={(e) => {
                setNextSteps(e.target.value)
                setSubmitted(false)
              }}
              placeholder="Example: Complete authentication and start testing the application..."
              className="min-h-36 rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 resize-none"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-200">
        <Button
          size="lg"
          onClick={handleSubmit}
          className="gap-2 bg-black hover:bg-zinc-900 text-white font-semibold h-12 px-8 shadow-md"
        >
          <Send size={18} />
          Submit Progress
        </Button>
      </div>
    </div>
  )
}