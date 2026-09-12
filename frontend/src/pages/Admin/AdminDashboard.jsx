import {
  FolderKanban,
  Users,
  UserRound,
  Clock,
  CheckCircle2,
  ClipboardList,
} from "lucide-react"

import DashboardHeader from "@/components/DashboardHeader"
import StatCard from "@/components/StatCard"
import ProjectTable from "@/components/ProjectTable"
import TeamTable from "@/components/TeamTable"

export default function AdminDashboard() {
  const projects = [
    {
      id: 1,
      title: "SmartEdu Platform",
      domain: "Education",
      team: "Team Alpha",
      mentor: "Dr. Sharma",
      progress: 65,
      status: "Active",
    },
    {
      id: 2,
      title: "HealthTrack",
      domain: "Healthcare",
      team: "Team Beta",
      mentor: "Dr. Mehta",
      progress: 40,
      status: "Under Review",
    },
    {
      id: 3,
      title: "EcoVision",
      domain: "Environment",
      team: "Team Gamma",
      mentor: "",
      progress: 20,
      status: "Pending",
    },
  ]

  const teams = [
    {
      id: 1,
      name: "Team Alpha",
      leader: "Vishu",
      members: 3,
      project: "SmartEdu Platform",
    },
    {
      id: 2,
      name: "Team Beta",
      leader: "Rahul",
      members: 4,
      project: "HealthTrack",
    },
    {
      id: 3,
      name: "Team Gamma",
      leader: "Priya",
      members: 3,
      project: "EcoVision",
    },
  ]

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Admin Dashboard"
        description="Monitor projects, teams, mentors and overall progress."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value="24"
          icon={FolderKanban}
          description="All registered projects"
        />

        <StatCard
          title="Total Teams"
          value="24"
          icon={Users}
          description="Active student teams"
        />

        <StatCard
          title="Total Mentors"
          value="8"
          icon={UserRound}
          description="Available mentors"
        />

        <StatCard
          title="Pending Reviews"
          value="6"
          icon={Clock}
          description="Projects awaiting review"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Completed Projects
              </p>

              <h3 className="text-2xl font-bold">8</h3>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Projects successfully completed.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <ClipboardList size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Active Projects
              </p>

              <h3 className="text-2xl font-bold">10</h3>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Projects currently in progress.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Overall Project Progress
          </h3>

          <div className="mt-5">
            <p className="text-3xl font-bold">68%</p>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[68%] rounded-full bg-primary" />
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Average progress across all projects.
          </p>
        </div>
      </div>

      <ProjectTable
        projects={projects}
        onView={(project) => console.log(project)}
      />

      <TeamTable teams={teams} />
    </div>
  )
}