import {
  LayoutDashboard,
  FolderKanban,
  Users,
  UserRound,
  MessageSquare,
  ClipboardCheck,
  BarChart3,
  Settings,
  X,
  GraduationCap,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen, role = "student" }) {
  const studentLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/student/dashboard",
    },
    {
      name: "My Project",
      icon: FolderKanban,
      path: "/student/project",
    },
    {
      name: "Team",
      icon: Users,
      path: "/student/team",
    },
    {
      name: "Submit Progress",
      icon: ClipboardCheck,
      path: "/student/progress",
    },
    {
      name: "Feedback",
      icon: MessageSquare,
      path: "/student/feedback",
    },
  ];

  const mentorLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/mentor/dashboard",
    },
    {
      name: "Assigned Projects",
      icon: FolderKanban,
      path: "/mentor/projects",
    },
    {
      name: "Reviews",
      icon: ClipboardCheck,
      path: "/mentor/reviews",
    },
    {
      name: "Feedback",
      icon: MessageSquare,
      path: "/mentor/feedback",
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Projects",
      icon: FolderKanban,
      path: "/admin/projects",
    },
    {
      name: "Teams",
      icon: Users,
      path: "/admin/teams",
    },
    {
      name: "Mentors",
      icon: UserRound,
      path: "/admin/mentors",
    },
    {
      name: "Reports",
      icon: BarChart3,
      path: "/admin/reports",
    },
  ];

  const links =
    role === "admin"
      ? adminLinks
      : role === "mentor"
        ? mentorLinks
        : studentLinks;

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sky-100 bg-white transition-transform duration-300 md:static md:translate-x-0 shadow-sm ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-18 items-center justify-between border-b border-sky-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white shadow-sm">
              <GraduationCap size={20} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Project<span className="text-sky-600">Flow</span>
            </h2>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-xl p-2 text-slate-400 hover:bg-sky-50 hover:text-slate-700 md:hidden transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 p-4">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white shadow-md shadow-black/10"
                      : "text-slate-600 hover:bg-sky-50/70 hover:text-sky-600"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-sky-100 p-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-sky-50/70 hover:text-sky-600 transition-colors">
            <Settings size={18} />
            Settings
          </button>
        </div>
      </aside>
    </>
  );
}