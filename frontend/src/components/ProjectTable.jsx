import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";

export default function ProjectTable({
  projects = [],
  onView,
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card text-card-foreground">
      <div className="border-b p-5">
        <h3 className="text-lg font-semibold text-foreground">
          Projects
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead className="bg-muted/50">
            <tr className="text-left text-xs uppercase text-muted-foreground">
              <th className="px-5 py-4">Project</th>
              <th className="px-5 py-4">Team</th>
              <th className="px-5 py-4">Mentor</th>
              <th className="px-5 py-4">Progress</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {projects.map((project) => (
              <tr key={project.id} className="text-sm">
                <td className="px-5 py-4">
                  <p className="font-semibold text-foreground">
                    {project.title}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.domain}
                  </p>
                </td>

                <td className="px-5 py-4 text-muted-foreground">
                  {project.team}
                </td>

                <td className="px-5 py-4 text-muted-foreground">
                  {project.mentor || "Not Assigned"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={project.status} />
                </td>

                <td className="px-5 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView?.(project)}
                    className="text-primary hover:bg-muted"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-10 text-center text-muted-foreground"
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