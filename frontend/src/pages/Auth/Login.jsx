import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("Student")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const roles = [
    {
      name: "Student",
      icon: GraduationCap,
      description: "Manage projects",
    },
    {
      name: "Mentor",
      icon: Users,
      description: "Guide students",
    },
    {
      name: "Admin",
      icon: ShieldCheck,
      description: "Manage system",
    },
  ]

  const handleLogin = async (e) => {
    e.preventDefault()

    setError("")

    if (!email || !password) {
      setError("Please enter your email and password")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        "http://localhost:5001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
            password,
            role: role.toLowerCase(),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      console.log("Login successful:", data)

      // Redirect according to selected role
      if (role === "Student") {
        navigate("/student/dashboard")
      } else if (role === "Mentor") {
        navigate("/mentor/dashboard")
      } else if (role === "Admin") {
        navigate("/admin/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-32px)] max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-2">

        {/* LEFT SIDE */}
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

            <div className="mt-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-blue-100">
                <Sparkles size={16} />
                Smart project collaboration
              </div>

              <h1 className="mt-7 text-5xl font-bold leading-tight">
                Manage projects.
                <span className="block text-blue-400">
                  Build better outcomes.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
                A unified workspace for students, mentors and administrators
                to manage projects, track progress and collaborate efficiently.
              </p>
            </div>
          </div>

          <div className="relative grid grid-cols-3 gap-3">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-2xl font-bold">
                3
              </p>

              <p className="mt-1 text-xs text-slate-400">
                User Roles
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-2xl font-bold">
                1
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Platform
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-2xl font-bold">
                24/7
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Access
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-5 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">

            <button
              onClick={() => navigate("/")}
              className="mb-8 text-sm font-medium text-slate-500 transition hover:text-blue-600 lg:hidden"
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
                Welcome back
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Select your portal and enter your account details to continue.
              </p>
            </div>

            {/* ROLE SELECTION */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Select your portal
              </p>

              <div className="grid grid-cols-3 gap-3">
                {roles.map((item) => {
                  const Icon = item.icon
                  const isSelected = role === item.name

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setRole(item.name)}
                      className={`rounded-xl border p-3 text-left transition ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[11px] leading-4 text-slate-500">
                        {item.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* LOGIN FORM */}
            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >

              {/* EMAIL */}
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

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

              {/* ERROR */}
              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : `Continue as ${role}`}

                {!loading && <ArrowRight size={18} />}
              </button>

            </form>

            {/* REGISTER */}
            {role !== "Admin" && (
              <p className="mt-7 text-center text-sm text-slate-500">
                Don't have an account?{" "}

                <button
                  onClick={() => navigate("/register")}
                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Create account
                </button>
              </p>
            )}

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              By continuing, you agree to access the ProjectMentor platform
              according to your assigned role.
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}