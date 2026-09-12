import { useMemo, useState } from "react"
import {
  Users,
  FolderKanban,
  UserRound,
  Search,
  Eye,
  UserPlus,
  CheckCircle2,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function Teams() {
  const [search, setSearch] = useState("")
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Team Alpha",
      leader: "Vishu",
      members: [
        "Vishu",
        "Rahul",
        "Aman",
      ],
      project: "SmartEdu Platform",
      mentor: "Dr. Sharma",
      status: "Active",
    },
    {
      id: 2,
      name: "Team Beta",
      leader: "Rahul",
      members: [
        "Rahul",
        "Priya",
        "Karan",
        "Neha",
      ],
      project: "HealthTrack",
      mentor: "Dr. Mehta",
      status: "Active",
    },
    {
      id: 3,
      name: "Team Gamma",
      leader: "Priya",
      members: [
        "Priya",
        "Aman",
        "Riya",
      ],
      project: "EcoVision",
      mentor: "Not Assigned",
      status: "Pending",
    },
    {
      id: 4,
      name: "Team Delta",
      leader: "Karan",
      members: [
        "Karan",
        "Vivek",
        "Sneha",
      ],
      project: "CareerConnect",
      mentor: "Dr. Patel",
      status: "Active",
    },
  ])

  const [newTeam, setNewTeam] = useState({
    name: "",
    leader: "",
    project: "",
  })

  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      `${team.name} ${team.leader} ${team.project} ${team.mentor}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [teams, search])

  const totalTeams = teams.length

  const totalMembers = teams.reduce(
    (total, team) => total + team.members.length,
    0
  )

  const activeTeams = teams.filter(
    (team) => team.status === "Active"
  ).length

  const pendingTeams = teams.filter(
    (team) => team.status === "Pending"
  ).length

  const handleAddTeam = (e) => {
    e.preventDefault()

    if (
      !newTeam.name.trim() ||
      !newTeam.leader.trim() ||
      !newTeam.project.trim()
    ) {
      return
    }

    const team = {
      id: Date.now(),
      name: newTeam.name,
      leader: newTeam.leader,
      members: [newTeam.leader],
      project: newTeam.project,
      mentor: "Not Assigned",
      status: "Pending",
    }

    setTeams([...teams, team])

    setNewTeam({
      name: "",
      leader: "",
      project: "",
    })

    setIsOpen(false)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Teams"
        description="Manage student teams and monitor their project assignments."
        action={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus />
                Add Team
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>

                <DialogDescription>
                  Add a new student team to the system.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleAddTeam}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Team Name</Label>

                  <Input
                    placeholder="Team Alpha"
                    value={newTeam.name}
                    onChange={(e) =>
                      setNewTeam({
                        ...newTeam,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Team Leader</Label>

                  <Input
                    placeholder="Enter team leader name"
                    value={newTeam.leader}
                    onChange={(e) =>
                      setNewTeam({
                        ...newTeam,
                        leader: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project</Label>

                  <Input
                    placeholder="Enter project name"
                    value={newTeam.project}
                    onChange={(e) =>
                      setNewTeam({
                        ...newTeam,
                        project: e.target.value,
                      })
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                >
                  <UserPlus />
                  Create Team
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <Users size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Teams
              </p>

              <p className="text-2xl font-bold">
                {totalTeams}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <UserRound size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Members
              </p>

              <p className="text-2xl font-bold">
                {totalMembers}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Active Teams
              </p>

              <p className="text-2xl font-bold">
                {activeTeams}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Pending Teams
              </p>

              <p className="text-2xl font-bold">
                {pendingTeams}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Teams</CardTitle>

          <CardDescription>
            View team members, project details and mentor assignments.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative mb-5 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Search teams..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>Leader</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">
                      {team.name}
                    </TableCell>

                    <TableCell>
                      {team.leader}
                    </TableCell>

                    <TableCell>
                      {team.members.length}
                    </TableCell>

                    <TableCell>
                      {team.project}
                    </TableCell>

                    <TableCell>
                      {team.mentor}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          team.status === "Active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {team.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSelectedTeam(team)
                        }
                      >
                        <Eye />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredTeams.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No teams found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedTeam}
        onOpenChange={(open) => {
          if (!open) setSelectedTeam(null)
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedTeam?.name}
            </DialogTitle>

            <DialogDescription>
              Team information and member details.
            </DialogDescription>
          </DialogHeader>

          {selectedTeam && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Team Leader
                  </p>

                  <p className="font-medium">
                    {selectedTeam.leader}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Project
                  </p>

                  <p className="font-medium">
                    {selectedTeam.project}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Mentor
                  </p>

                  <p className="font-medium">
                    {selectedTeam.mentor}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Status
                  </p>

                  <div className="mt-1">
                    <Badge
                      variant={
                        selectedTeam.status === "Active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {selectedTeam.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium">
                  Team Members
                </p>

                <div className="space-y-2">
                  {selectedTeam.members.map(
                    (member, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {member.charAt(0)}
                        </div>

                        <p className="font-medium">
                          {member}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}