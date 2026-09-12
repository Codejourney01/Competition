import StatusBadge from "./StatusBadge";

export default function ProjectTable({
  projects = [],
  onView,
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="border-b p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          Projects
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs uppercase text-gray-500">
              <th className="px-5 py-4">Project</th>
              <th className="px-5 py-4">Team</th>
              <th className="px-5 py-4">Mentor</th>
              <th className="px-5 py-4">Progress</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {projects.map((project) => (
              <tr key={project.id} className="text-sm">
                <td className="px-5 py-4">
                  <p className="font-semibold text-gray-800">
                    {project.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {project.domain}
                  </p>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {project.team}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {project.mentor || "Not Assigned"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>

                    <span className="text-xs text-gray-600">
                      {project.progress}%
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={project.status} />
                </td>

                <td className="px-5 py-4">
                  <button
                    onClick={() => onView?.(project)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}