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
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-5">
          <h2 className="text-xl font-bold">
            Project<span className="text-blue-600">Flow</span>
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100">
            <Settings size={19} />
            Settings
          </button>
        </div>
      </aside>
    </>
  );
}