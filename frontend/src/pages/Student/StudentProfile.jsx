import { useState } from "react"
import {
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Pencil,
  Save,
  X,
  Plus,
  Trash2,
  FolderKanban,
  CheckCircle2,
  Award,
} from "lucide-react"

import DashboardHeader from "@/components/DashboardHeader"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  // Temporary state to hold values during editing
  const [tempProfile, setTempProfile] = useState({
    name: "Vishu",
    email: "vishu@example.com",
    phone: "+91 9876543210",
    college: "ABC College",
    course: "Bachelor of Computer Applications",
    semester: "Final Year",
  })

  // Committed state that updates only on Save
  const [profile, setProfile] = useState(tempProfile)

  const [skillInput, setSkillInput] = useState("")

  const [tempSkills, setTempSkills] = useState([
    "React",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
  ])

  const [skills, setSkills] = useState(tempSkills)

  const handleChange = (e) => {
    const { name, value } = e.target

    setTempProfile({
      ...tempProfile,
      [name]: value,
    })

    setSaved(false)
  }

  const addSkill = () => {
    const value = skillInput.trim()

    if (!value) return

    if (tempSkills.some((skill) => skill.toLowerCase() === value.toLowerCase())) {
      return
    }

    setTempSkills([...tempSkills, value])
    setSkillInput("")
    setSaved(false)
  }

  const removeSkill = (skillToRemove) => {
    setTempSkills(
      tempSkills.filter((skill) => skill !== skillToRemove)
    )

    setSaved(false)
  }

  const handleSave = () => {
    setProfile(tempProfile)
    setSkills(tempSkills)
    setIsEditing(false)
    setSaved(true)
  }

  const handleCancel = () => {
    setTempProfile(profile)
    setTempSkills(skills)
    setSkillInput("")
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="My Profile"
        description="Manage your personal, academic and project information."
      />

      {saved && (
        <Card className="border-green-500">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="font-semibold">
                Profile Updated Successfully
              </p>

              <p className="text-sm text-muted-foreground">
                Your profile information has been saved.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
              {profile.name.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-4 text-xl font-bold">
              {profile.name}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Student
            </p>

            <Badge
              variant="secondary"
              className="mt-3"
            >
              {profile.semester}
            </Badge>

            <div className="mt-6 w-full space-y-4 border-t pt-6 text-left">
              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-muted-foreground"
                />

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="truncate text-sm font-medium">
                    {profile.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-muted-foreground"
                />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>

                  <p className="text-sm font-medium">
                    {profile.phone}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Personal Information</CardTitle>

                <CardDescription>
                  Manage your basic profile information.
                </CardDescription>
              </div>

              {!isEditing ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(true)
                    setSaved(false)
                  }}
                >
                  <Pencil size={18} />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                  >
                    <X size={18} />
                    Cancel
                  </Button>

                  <Button onClick={handleSave}>
                    <Save size={18} />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>

              <Input
                name="name"
                value={tempProfile.name}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>

              <Input
                name="email"
                type="email"
                value={tempProfile.email}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>

              <Input
                name="phone"
                value={tempProfile.phone}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Semester</Label>

              <Input
                name="semester"
                value={tempProfile.semester}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap size={20} />
            Academic Information
          </CardTitle>

          <CardDescription>
            Your education and course details.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>College / Institution</Label>

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                name="college"
                value={tempProfile.college}
                disabled={!isEditing}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Course</Label>

            <Input
              name="course"
              value={tempProfile.course}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills & Technologies</CardTitle>

          <CardDescription>
            Manage your technical skills and technologies.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {isEditing && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder="Add a skill or technology"
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSkill()
                  }
                }}
              />

              <Button
                type="button"
                onClick={addSkill}
              >
                <Plus size={18} />
                Add Skill
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {(isEditing ? tempSkills : skills).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-2"
              >
                {skill}

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <FolderKanban size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Active Projects
              </p>

              <p className="text-2xl font-bold">
                1
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Project Progress
              </p>

              <p className="text-2xl font-bold">
                65%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <Award size={22} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Performance
              </p>

              <p className="text-2xl font-bold">
                Good
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}