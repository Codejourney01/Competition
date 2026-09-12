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
    <div className="min-h-screen bg-sky-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <DashboardHeader
        title="Admin Dashboard"
        description="Monitor projects, teams, mentors and overall progress."
      />

      {/* Top Stat Cards Grid */}
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

      {/* Overview Metric Cards Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-xl transition-all hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-50 p-3.5 text-emerald-600 border border-emerald-200">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                Completed Projects
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-1">8</h3>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400 font-medium">
            Projects successfully completed.
          </p>
        </div>

        <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-xl transition-all hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-sky-50 p-3.5 text-sky-600 border border-sky-200">
              <ClipboardList size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">
                Active Projects
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-1">10</h3>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400 font-medium">
            Projects currently in progress.
          </p>
        </div>

        <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-xl transition-all hover:shadow-lg">
          <h3 className="text-sm font-medium text-slate-500">
            Overall Project Progress
          </h3>

          <div className="mt-4">
            <p className="text-3xl font-bold text-slate-900">68%</p>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-sky-50 border border-sky-100">
              <div className="h-full w-[68%] rounded-full bg-sky-500 shadow-2xs" />
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400 font-medium">
            Average progress across all projects.
          </p>
        </div>
      </div>

      {/* Tables Section */}
      <div className="space-y-8">
        <div className="rounded-2xl border border-sky-100 bg-white shadow-xl overflow-hidden">
          <ProjectTable
            projects={projects}
            onView={(project) => console.log(project)}
          />
        </div>

        <div className="rounded-2xl border border-sky-100 bg-white shadow-xl overflow-hidden">
          <TeamTable teams={teams} />
        </div>
      </div>
    </div>
  )
}