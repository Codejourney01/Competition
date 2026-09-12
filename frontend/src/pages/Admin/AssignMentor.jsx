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

  // Map to store assignments per project ID: { [projectId]: { mentorId: string, assigned: boolean } }
  const [assignments, setAssignments] = useState({})

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

  const handleProjectChange = (value) => {
    setProject(value)

    if (assignments[value]) {
      setMentor(assignments[value].mentorId)
    } else {
      setMentor("")
    }
  }

  const handleAssign = () => {
    if (!project || !mentor) return

    setAssignments({
      ...assignments,
      [project]: {
        mentorId: mentor,
        assigned: true,
      },
    })
  }

  const selectedProject = projects.find(
    (item) => item.id === project
  )

  const currentAssignment = project ? assignments[project] : null
  const assignedMentorId = currentAssignment ? currentAssignment.mentorId : mentor
  const isAssigned = currentAssignment ? currentAssignment.assigned : false

  const selectedMentor = mentors.find(
    (item) => item.id === assignedMentorId
  )

  return (
    <div className="min-h-screen bg-sky-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <DashboardHeader
        title="Assign Mentor"
        description="Assign a mentor to a student project."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <UserPlus size={20} className="text-sky-600" />
              Mentor Assignment
            </CardTitle>

            <CardDescription className="text-slate-500">
              Select a project and assign an available mentor.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">
                Select Project
              </label>

              <Select
                value={project}
                onValueChange={handleProjectChange}
              >
                <SelectTrigger className="w-full h-11 rounded-xl border border-slate-200 bg-white text-sm">
                  <SelectValue placeholder="Choose a project" />
                </SelectTrigger>

                <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
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
              <label className="text-sm font-semibold text-slate-700 block">
                Select Mentor
              </label>

              <Select
                value={mentor}
                onValueChange={setMentor}
              >
                <SelectTrigger className="w-full h-11 rounded-xl border border-slate-200 bg-white text-sm">
                  <SelectValue placeholder="Choose a mentor" />
                </SelectTrigger>

                <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
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
              className="w-full gap-2 bg-black hover:bg-zinc-900 text-white font-semibold h-11 shadow-md"
              onClick={handleAssign}
              disabled={!project || !mentor}
            >
              <UserPlus size={16} />
              Assign Mentor
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-sky-100 bg-white shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg text-slate-900">Assignment Summary</CardTitle>

            <CardDescription className="text-slate-500">
              Review the selected project and mentor.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {!project || !assignedMentorId ? (
              <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
                <p className="text-sm text-slate-400 font-medium">
                  Select a project and mentor to preview the assignment.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Project
                  </p>

                  <p className="mt-1 font-bold text-slate-900 text-sm">
                    {selectedProject?.title}
                  </p>

                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {selectedProject?.team}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Assigned Mentor
                  </p>

                  <p className="mt-1 font-bold text-slate-900 text-sm">
                    {selectedMentor?.name}
                  </p>

                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {selectedMentor?.expertise}
                  </p>
                </div>

                {isAssigned && (
                  <div className="flex items-center gap-3.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-2xs">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                      <CheckCircle2 size={18} />
                    </div>

                    <div>
                      <p className="font-semibold text-emerald-800 text-sm">
                        Mentor Assigned Successfully
                      </p>

                      <p className="text-xs text-emerald-700 mt-0.5">
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