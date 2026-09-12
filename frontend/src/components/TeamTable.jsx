import { Users } from "lucide-react";

export default function TeamTable({ teams = [] }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="border-b p-5">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Users size={20} />
          Teams
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs uppercase text-gray-500">
              <th className="px-5 py-4">Team</th>
              <th className="px-5 py-4">Leader</th>
              <th className="px-5 py-4">Members</th>
              <th className="px-5 py-4">Project</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {teams.map((team) => (
              <tr key={team.id} className="text-sm">
                <td className="px-5 py-4 font-semibold text-gray-800">
                  {team.name}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {team.leader}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {team.members}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {team.project}
                </td>
              </tr>
            ))}

            {teams.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-5 py-10 text-center text-gray-500"
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