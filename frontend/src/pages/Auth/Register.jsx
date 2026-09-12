import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

export default function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("Student")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")

  const roles = [
    {
      name: "Student",
      icon: GraduationCap,
      description: "Create and manage projects",
    },
    {
      name: "Mentor",
      icon: Users,
      description: "Guide student projects",
    },
  ]

  const handleRegister = (e) => {
    e.preventDefault()

    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-32px)] max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-2">
        
        <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.35),transparent_40%)]" />

          <div className="relative">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600">
                <GraduationCap size={23} />
              </div>

              <div className="text-left">
                <p className="text-lg font-bold">
                  ProjectMentor
                </p>

                <p className="text-xs text-slate-400">
                  Project Management System
                </p>
              </div>
            </button>

            <div className="mt-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-blue-100">
                <Sparkles size={16} />
                Start your project journey
              </div>

              <h1 className="mt-7 text-5xl font-bold leading-tight">
                Turn your ideas
                <span className="block text-blue-400">
                  into great projects.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
                Create your account and collaborate with mentors and team
                members while managing your project progress in one place.
              </p>
            </div>
          </div>

          <div className="relative space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                <Check size={20} />
              </div>

              <div>
                <p className="font-semibold">
                  Manage your project
                </p>

                <p className="text-sm text-slate-400">
                  Keep all your project work organized.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                <Check size={20} />
              </div>

              <div>
                <p className="font-semibold">
                  Track progress
                </p>

                <p className="text-sm text-slate-400">
                  Monitor milestones and project updates.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                <Check size={20} />
              </div>

              <div>
                <p className="font-semibold">
                  Get mentor feedback
                </p>

                <p className="text-sm text-slate-400">
                  Collaborate and improve your project.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-5 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <button
              onClick={() => navigate("/")}
              className="mb-7 text-sm font-medium text-slate-500 transition hover:text-blue-600 lg:hidden"
            >
              ← Back to Home
            </button>

            <div className="lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap size={24} />
              </div>
            </div>

            <div className="mt-5 lg:mt-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Get started
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Join ProjectMentor and start managing projects more efficiently.
              </p>
            </div>

            <form
              onSubmit={handleRegister}
              className="mt-7 space-y-4"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  Register as
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {roles.map((item) => {
                    const Icon = item.icon
                    const isSelected = role === item.name

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setRole(item.name)}
                        className={`rounded-xl border p-4 text-left transition ${
                          isSelected
                            ? "border-blue-600 bg-blue-50 shadow-sm"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon size={19} />
                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-900">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Create {role} Account
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}