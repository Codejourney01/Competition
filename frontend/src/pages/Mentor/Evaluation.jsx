import { useMemo, useState } from "react"
import {
  Award,
  Star,
  Users,
  Save,
  CheckCircle2,
} from "lucide-react"

import DashboardHeader from "@/components/DashboardHeader"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Badge } from "@/components/ui/badge"

export default function Evaluation() {
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

  const criteria = [
    {
      id: "innovation",
      title: "Innovation & Creativity",
      maxMarks: 20,
    },
    {
      id: "implementation",
      title: "Technical Implementation",
      maxMarks: 25,
    },
    {
      id: "design",
      title: "UI/UX & Design",
      maxMarks: 15,
    },
    {
      id: "functionality",
      title: "Functionality",
      maxMarks: 25,
    },
    {
      id: "presentation",
      title: "Presentation & Documentation",
      maxMarks: 15,
    },
  ]

  const [selectedProjectId, setSelectedProjectId] = useState("")

  // Saved/committed evaluation state map: { [projectId]: { marks: {...}, remarks: "..." } }
  const [evaluations, setEvaluations] = useState({})

  // Temporary active inputs for the currently selected project
  const [tempMarks, setTempMarks] = useState({
    innovation: "",
    implementation: "",
    design: "",
    functionality: "",
    presentation: "",
  })

  const [tempRemarks, setTempRemarks] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  )

  const handleProjectChange = (value) => {
    setSelectedProjectId(value)
    setSubmitted(false)

    // Load existing evaluation data for the selected project if it exists
    if (evaluations[value]) {
      setTempMarks(evaluations[value].marks)
      setTempRemarks(evaluations[value].remarks)
    } else {
      setTempMarks({
        innovation: "",
        implementation: "",
        design: "",
        functionality: "",
        presentation: "",
      })
      setTempRemarks("")
    }
  }

  const totalMarks = useMemo(() => {
    return Object.values(tempMarks).reduce(
      (total, mark) => total + (Number(mark) || 0),
      0
    )
  }, [tempMarks])

  const percentage = totalMarks

  const handleMarkChange = (criterion, value, maxMarks) => {
    const numberValue = Number(value)

    if (numberValue > maxMarks) {
      return
    }

    setTempMarks({
      ...tempMarks,
      [criterion]: value,
    })

    setSubmitted(false)
  }

  const getGrade = () => {
    if (percentage >= 90) return "Excellent"
    if (percentage >= 75) return "Very Good"
    if (percentage >= 60) return "Good"
    if (percentage >= 40) return "Average"
    return "Needs Improvement"
  }

  const handleSubmit = () => {
    if (!selectedProjectId) {
      alert("Please select a project")
      return
    }

    const allFilled = criteria.every(
      (criterion) => tempMarks[criterion.id] !== ""
    )

    if (!allFilled) {
      alert("Please enter marks for all criteria")
      return
    }

    // Save the evaluation data into the committed state map
    setEvaluations({
      ...evaluations,
      [selectedProjectId]: {
        marks: tempMarks,
        remarks: tempRemarks,
      },
    })

    setSubmitted(true)
  }

  const handleReset = () => {
    setTempMarks({
      innovation: "",
      implementation: "",
      design: "",
      functionality: "",
      presentation: "",
    })

    setTempRemarks("")
    setSubmitted(false)

    if (selectedProjectId) {
      const updated = { ...evaluations }
      delete updated[selectedProjectId]
      setEvaluations(updated)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Project Evaluation"
        description="Evaluate assigned student projects based on defined criteria."
      />

      <Card>
        <CardHeader>
          <CardTitle>Select Project</CardTitle>

          <CardDescription>
            Choose a project to begin evaluation.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Select
            value={selectedProjectId}
            onValueChange={handleProjectChange}
          >
            <SelectTrigger>
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

      {selectedProject && (
        <>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedProject.title}
                </CardTitle>

                <CardDescription>
                  Project and team information.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Team
                    </p>

                    <p className="font-semibold">
                      {selectedProject.team}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Project Progress
                    </p>

                    <p className="font-semibold">
                      {selectedProject.progress}%
                    </p>
                  </div>
                </div>

                <Progress
                  value={selectedProject.progress}
                />

                <div>
                  <p className="mb-3 text-sm font-medium">
                    Team Members
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedProject.students.map(
                      (student) => (
                        <Badge
                          key={student}
                          variant="secondary"
                          className="gap-2 px-3 py-2"
                        >
                          <Users size={14} />
                          {student}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award size={20} />
                  Evaluation Score
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="text-center">
                  <p className="text-5xl font-bold">
                    {totalMarks}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    out of 100
                  </p>
                </div>

                <Progress value={percentage} />

                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Performance
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {getGrade()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                Evaluation Criteria
              </CardTitle>

              <CardDescription>
                Enter marks for each evaluation category.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {criteria.map((criterion) => (
                <div
                  key={criterion.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-medium">
                        {criterion.title}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Maximum marks: {criterion.maxMarks}
                      </p>
                    </div>

                    <div className="w-full sm:w-32">
                      <Label className="mb-2 block">
                        Marks
                      </Label>

                      <Input
                        type="number"
                        min="0"
                        max={criterion.maxMarks}
                        placeholder={`0 - ${criterion.maxMarks}`}
                        value={tempMarks[criterion.id]}
                        onChange={(e) =>
                          handleMarkChange(
                            criterion.id,
                            e.target.value,
                            criterion.maxMarks
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Mentor Remarks
              </CardTitle>

              <CardDescription>
                Provide feedback and suggestions for the team.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Textarea
                placeholder="Write your evaluation remarks and suggestions..."
                className="min-h-32"
                value={tempRemarks}
                onChange={(e) => {
                  setTempRemarks(e.target.value)
                  setSubmitted(false)
                }}
              />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={handleReset}
            >
              Reset Evaluation
            </Button>

            <Button onClick={handleSubmit}>
              <Save />
              Submit Evaluation
            </Button>
          </div>

          {submitted && (
            <Card className="border-green-500">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <CheckCircle2 size={24} />
                </div>

                <div>
                  <p className="font-semibold">
                    Evaluation Submitted Successfully
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {selectedProject.title} received a score of{" "}
                    {totalMarks}/100 ({getGrade()}).
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {!selectedProject && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="rounded-full bg-muted p-4">
              <Star
                size={28}
                className="text-muted-foreground"
              />
            </div>

            <div>
              <p className="font-semibold">
                No Project Selected
              </p>

              <p className="text-sm text-muted-foreground">
                Select one of your assigned projects to start
                the evaluation.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}