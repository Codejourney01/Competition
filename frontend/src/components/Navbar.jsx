import { Bell, Menu, User } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-bold text-gray-900">
          Project<span className="text-blue-600">Flow</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 hover:bg-gray-100">
          <Bell size={21} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            <User size={18} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Vishu</p>
            <p className="text-xs text-gray-500">Student</p>
          </div>
        </div>
      </div>
    </header>
  );
}