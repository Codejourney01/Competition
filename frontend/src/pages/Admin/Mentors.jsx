import { useMemo, useState } from "react"
import {
  Search,
  UserPlus,
  Users,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react"

import DashboardHeader from "@/components/DashboardHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

export default function Mentors() {
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: "Dr. Sharma",
      email: "sharma@college.edu",
      expertise: "Web Development",
      projects: 3,
      status: "Active",
    },
    {
      id: 2,
      name: "Dr. Mehta",
      email: "mehta@college.edu",
      expertise: "Artificial Intelligence",
      projects: 2,
      status: "Active",
    },
    {
      id: 3,
      name: "Dr. Patel",
      email: "patel@college.edu",
      expertise: "Data Science",
      projects: 4,
      status: "Active",
    },
    {
      id: 4,
      name: "Prof. Verma",
      email: "verma@college.edu",
      expertise: "Mobile Development",
      projects: 0,
      status: "Available",
    },
  ])

  const [newMentor, setNewMentor] = useState({
    name: "",
    email: "",
    expertise: "",
  })

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) =>
      `${mentor.name} ${mentor.email} ${mentor.expertise}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [mentors, search])

  const activeMentors = mentors.filter(
    (mentor) => mentor.status === "Active"
  ).length

  const availableMentors = mentors.filter(
    (mentor) => mentor.status === "Available"
  ).length

  const totalProjects = mentors.reduce(
    (total, mentor) => total + mentor.projects,
    0
  )

  const handleAddMentor = (e) => {
    e.preventDefault()

    if (
      !newMentor.name.trim() ||
      !newMentor.email.trim() ||
      !newMentor.expertise.trim()
    ) {
      return
    }

    setMentors([
      ...mentors,
      {
        id: Date.now(),
        ...newMentor,
        projects: 0,
        status: "Available",
      },
    ])

    setNewMentor({
      name: "",
      email: "",
      expertise: "",
    })

    setIsOpen(false)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Mentors"
        description="Manage mentors and monitor their project assignments."
        action={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus />
                Add Mentor
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Mentor</DialogTitle>

                <DialogDescription>
                  Add a mentor to the project monitoring system.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleAddMentor}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Full Name</Label>

                  <Input
                    placeholder="Enter mentor name"
                    value={newMentor.name}
                    onChange={(e) =>
                      setNewMentor({
                        ...newMentor,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>

                  <Input
                    type="email"
                    placeholder="mentor@college.edu"
                    value={newMentor.email}
                    onChange={(e) =>
                      setNewMentor({
                        ...newMentor,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Expertise</Label>

                  <Input
                    placeholder="Web Development"
                    value={newMentor.expertise}
                    onChange={(e) =>
                      setNewMentor({
                        ...newMentor,
                        expertise: e.target.value,
                      })
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                >
                  <UserPlus />
                  Add Mentor
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
                Total Mentors
              </p>

              <p className="text-2xl font-bold">
                {mentors.length}
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
                Active Mentors
              </p>

              <p className="text-2xl font-bold">
                {activeMentors}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <BriefcaseBusiness size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Assigned Projects
              </p>

              <p className="text-2xl font-bold">
                {totalProjects}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <UserPlus size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Available
              </p>

              <p className="text-2xl font-bold">
                {availableMentors}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Mentors</CardTitle>

          <CardDescription>
            View mentor expertise and current project workload.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative mb-5 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Search mentors..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Assigned Projects</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredMentors.map((mentor) => (
                  <TableRow key={mentor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {mentor.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-medium">
                            {mentor.name}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {mentor.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {mentor.expertise}
                    </TableCell>

                    <TableCell>
                      {mentor.projects}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          mentor.status === "Active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {mentor.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredMentors.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No mentors found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}