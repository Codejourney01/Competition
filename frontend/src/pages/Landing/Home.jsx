import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Menu,
  ShieldCheck,
  Users,
  X,
} from "lucide-react"

import { useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [loginMenu, setLoginMenu] = useState(false)

  const features = [
    {
      icon: <ClipboardCheck size={24} />,
      title: "Project Management",
      description:
        "Create, organize and manage student projects with complete project visibility.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Progress Tracking",
      description:
        "Track milestones, submissions and project completion in real time.",
    },
    {
      icon: <Users size={24} />,
      title: "Team Collaboration",
      description:
        "Keep students, mentors and administrators connected in one workspace.",
    },
    {
      icon: <FileText size={24} />,
      title: "Smart Evaluation",
      description:
        "Review project work, provide feedback and evaluate student performance.",
    },
    {
      icon: <Bell size={24} />,
      title: "Instant Updates",
      description:
        "Stay informed about submissions, feedback and important project updates.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Role Based Access",
      description:
        "Dedicated dashboards and permissions for students, mentors and administrators.",
    },
  ]

  const roles = [
    {
      icon: <GraduationCap size={28} />,
      title: "Student Portal",
      description:
        "Create projects, manage work, submit progress and receive mentor feedback.",
      link: "/login/student",
      button: "Continue as Student",
    },
    {
      icon: <Users size={28} />,
      title: "Mentor Portal",
      description:
        "Review assigned projects, monitor progress and guide student teams.",
      link: "/login/mentor",
      button: "Continue as Mentor",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Administrator Portal",
      description:
        "Manage projects, teams, mentors and monitor the complete system.",
      link: "/login/admin",
      button: "Continue as Admin",
    },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
              <GraduationCap size={22} />
            </div>

            <div>
              <p className="text-xl font-bold tracking-tight">
                Project<span className="text-blue-600">Mentor</span>
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              How It Works
            </a>

            <a
              href="#portals"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Portals
            </a>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="relative">
              <button
                onClick={() => setLoginMenu(!loginMenu)}
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Login
                <ChevronDown
                  size={16}
                  className={`transition ${
                    loginMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {loginMenu && (
                <div className="absolute right-0 top-12 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link
                    to="/login/student"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-blue-50"
                  >
                    <GraduationCap
                      size={18}
                      className="text-blue-600"
                    />

                    Student Login
                  </Link>

                  <Link
                    to="/login/mentor"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-blue-50"
                  >
                    <Users
                      size={18}
                      className="text-blue-600"
                    />

                    Mentor Login
                  </Link>

                  <Link
                    to="/login/admin"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-blue-50"
                  >
                    <ShieldCheck
                      size={18}
                      className="text-blue-600"
                    />

                    Admin Login
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/register"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg p-2 lg:hidden"
          >
            {mobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-slate-700"
              >
                Features
              </a>

              <a
                href="#workflow"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-slate-700"
              >
                How It Works
              </a>

              <a
                href="#portals"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-slate-700"
              >
                Portals
              </a>

              <div className="border-t pt-4">
                <p className="mb-3 text-sm font-semibold text-slate-500">
                  LOGIN AS
                </p>

                <div className="flex flex-col gap-2">
                  <Link
                    to="/login/student"
                    className="rounded-lg bg-slate-100 px-4 py-3 font-medium"
                  >
                    Student
                  </Link>

                  <Link
                    to="/login/mentor"
                    className="rounded-lg bg-slate-100 px-4 py-3 font-medium"
                  >
                    Mentor
                  </Link>

                  <Link
                    to="/login/admin"
                    className="rounded-lg bg-slate-900 px-4 py-3 text-center font-medium text-white"
                  >
                    Administrator
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.12),transparent_35%)]" />

          <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                <CheckCircle2 size={16} />
                One platform for project management
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Build better projects.
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Learn together.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                A modern project monitoring and mentoring platform that connects
                students, mentors and administrators to manage projects,
                track progress and improve outcomes.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                >
                  Start Your Project
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="#portals"
                  className="flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Explore Portals
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-7">
                <div>
                  <p className="text-2xl font-bold">
                    3
                  </p>
                  <p className="text-sm text-slate-500">
                    User Roles
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    100%
                  </p>
                  <p className="text-sm text-slate-500">
                    Progress Visibility
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    1
                  </p>
                  <p className="text-sm text-slate-500">
                    Unified Platform
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-200/60 to-indigo-100/40 blur-2xl" />

              <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-300/50">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      Project Dashboard
                    </p>

                    <h3 className="text-xl font-bold">
                      SmartEdu Platform
                    </h3>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      Progress
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      65%
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[65%] rounded-full bg-blue-600" />
                    </div>
                  </div>

                  <div className="rounded-xl border bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      Team Members
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      03
                    </p>

                    <div className="mt-4 flex -space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-xs text-white">
                        V
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-500 text-xs text-white">
                        R
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-purple-500 text-xs text-white">
                        A
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">
                        Recent Activity
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Progress submitted for mentor review
                      </p>
                    </div>

                    <CheckCircle2
                      size={22}
                      className="text-green-500"
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-xs text-slate-500">
                      Tasks
                    </p>

                    <p className="mt-1 font-bold">
                      12 / 18
                    </p>
                  </div>

                  <div className="rounded-lg bg-indigo-50 p-3">
                    <p className="text-xs text-slate-500">
                      Feedback
                    </p>

                    <p className="mt-1 font-bold">
                      04 New
                    </p>
                  </div>

                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-xs text-slate-500">
                      Status
                    </p>

                    <p className="mt-1 font-bold text-green-600">
                      On Track
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-y border-slate-200 bg-slate-50"
        >
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Powerful Features
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Everything you need to manage projects
              </h2>

              <p className="mt-5 text-slate-600">
                From project creation to final evaluation, manage the complete
                student project lifecycle from one platform.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    {feature.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
        >
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Simple Workflow
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                From idea to final evaluation
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-600">
                The platform provides a clear workflow that helps every user
                understand what happens at each stage of the project.
              </p>
            </div>

            <div className="space-y-5">
              {[
                [
                  "01",
                  "Create Project",
                  "Students create and organize their project details and team.",
                ],
                [
                  "02",
                  "Track Progress",
                  "Teams submit regular updates and track milestones.",
                ],
                [
                  "03",
                  "Mentor Review",
                  "Mentors review submissions and provide feedback.",
                ],
                [
                  "04",
                  "Evaluation",
                  "Projects are evaluated and administrators monitor outcomes.",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="flex gap-5 rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                    {number}
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="portals"
          className="bg-slate-950 px-5 py-24 text-white lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
                Role Based Platform
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                One system. Three powerful portals.
              </h2>

              <p className="mt-5 text-slate-400">
                Every role gets a dedicated experience designed for their work.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {roles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-7"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
                    {role.icon}
                  </div>

                  <h3 className="mt-7 text-2xl font-bold">
                    {role.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {role.description}
                  </p>

                  <Link
                    to={role.link}
                    className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-blue-50"
                  >
                    {role.button}
                    <ArrowRight size={17} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-16 text-center text-white sm:px-12">
            <BookOpen
              size={38}
              className="mx-auto"
            />

            <h2 className="mt-6 text-4xl font-bold">
              Ready to start your next project?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-blue-100">
              Join the platform and manage your complete project journey from
              planning to evaluation.
            </p>

            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Create Your Account
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <GraduationCap
              size={20}
              className="text-blue-600"
            />
            ProjectMentor
          </div>

          <p>
            © 2026 ProjectMentor. Project Monitoring & Mentoring System.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home