import { Users } from "lucide-react";

export default function TeamTable({ teams = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-xl">
      <div className="border-b border-slate-100 p-6">
        <h3 className="flex items-center gap-2.5 text-lg font-bold text-slate-900">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
            <Users size={18} />
          </div>
          Teams
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead className="bg-slate-50/70 border-b border-slate-100">
            <tr className="text-left text-xs uppercase font-semibold text-slate-500 tracking-wider">
              <th className="px-6 py-4">Team</th>
              <th className="px-6 py-4">Leader</th>
              <th className="px-6 py-4">Members</th>
              <th className="px-6 py-4">Project</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {teams.map((team) => (
              <tr key={team.id} className="text-sm hover:bg-sky-50/30 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">
                  {team.name}
                </td>

                <td className="px-6 py-4 font-medium text-slate-700">
                  {team.leader}
                </td>

                <td className="px-6 py-4 font-medium text-slate-600">
                  <span className="inline-flex items-center justify-center h-7 px-2.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                    {team.members} Members
                  </span>
                </td>

                <td className="px-6 py-4 font-medium text-slate-700">
                  {team.project}
                </td>
              </tr>
            ))}

            {teams.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-12 text-center text-slate-400 font-medium text-sm"
                >
                  No teams found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}