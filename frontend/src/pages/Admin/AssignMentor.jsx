import { useState } from "react"
import { UserPlus, CheckCircle2 } from "lucide-react"

import DashboardHeader from "@/components/DashboardHeader"
import { Button } from "@/components/ui/button"
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

export default function AssignMentor() {
  const [project, setProject] = useState("")
  const [mentor, setMentor] = useState("")
  const [assigned, setAssigned] = useState(false)

  const projects = [
    {
      id: "1",
      title: "SmartEdu Platform",
      team: "Team Alpha",
    },
    {
      id: "2",
      title: "HealthTrack",
      team: "Team Beta",
    },
    {
      id: "3",
      title: "EcoVision",
      team: "Team Gamma",
    },
  ]

  const mentors = [
    {
      id: "1",
      name: "Dr. Sharma",
      expertise: "Web Development",
    },
    {
      id: "2",
      name: "Dr. Mehta",
      expertise: "Artificial Intelligence",
    },
    {
      id: "3",
      name: "Dr. Patel",
      expertise: "Data Science",
    },
  ]

  const handleAssign = () => {
    if (!project || !mentor) return

    setAssigned(true)
  }

  const selectedProject = projects.find(
    (item) => item.id === project
  )

  const selectedMentor = mentors.find(
    (item) => item.id === mentor
  )

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Assign Mentor"
        description="Assign a mentor to a student project."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus size={22} />
              Mentor Assignment
            </CardTitle>

            <CardDescription>
              Select a project and assign an available mentor.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Select Project
              </label>

              <Select
                value={project}
                onValueChange={setProject}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a project" />
                </SelectTrigger>

                <SelectContent>
                  {projects.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.title} — {item.team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Select Mentor
              </label>

              <Select
                value={mentor}
                onValueChange={setMentor}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a mentor" />
                </SelectTrigger>

                <SelectContent>
                  {mentors.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name} — {item.expertise}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              onClick={handleAssign}
              disabled={!project || !mentor}
            >
              <UserPlus />
              Assign Mentor
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignment Summary</CardTitle>

            <CardDescription>
              Review the selected project and mentor.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!project || !mentor ? (
              <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground">
                  Select a project and mentor to preview the assignment.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    Project
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedProject?.title}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {selectedProject?.team}
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    Assigned Mentor
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedMentor?.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {selectedMentor?.expertise}
                  </p>
                </div>

                {assigned && (
                  <div className="flex items-center gap-3 rounded-lg border p-4">
                    <CheckCircle2
                      size={22}
                      className="text-green-600"
                    />

                    <div>
                      <p className="font-medium">
                        Mentor Assigned Successfully
                      </p>

                      <p className="text-sm text-muted-foreground">
                        The project is now ready for mentor review.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}