import {
  Calendar,
  Users,
  GithubIcon,
  ExternalLink,
  MoreHorizontal,
  FolderKanban,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ProjectCard({ project }) {
  const getStatusVariant = (status) => {
    if (status === "Completed") return "default";
    if (status === "In Progress") return "secondary";
    return "outline";
  };

  return (
    <Card className="transition-all hover:shadow-md bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FolderKanban size={21} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground">
              {project.title}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {project.domain}
            </p>
          </div>
        </div>

        <Button variant="ghost" size="icon">
          <MoreHorizontal size={20} />
        </Button>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {project.description || "No project description available."}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 4).map((technology) => (
            <Badge key={technology} variant="secondary">
              {technology}
            </Badge>
          ))}

          {project.technologies?.length > 4 && (
            <Badge variant="outline">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>

            <span className="font-semibold text-foreground">
              {project.progressPercentage || 0}%
            </span>
          </div>

          <Progress value={project.progressPercentage || 0} />
        </div>

        <div className="grid grid-cols-2 gap-3 border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users size={16} />

            <span>
              {project.teamMembers?.length || 0} Members
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
            <Calendar size={16} />

            <span>
              {project.currentMilestone || "Proposal"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Badge
            variant={getStatusVariant(
              project.status === "submitted"
                ? "In Progress"
                : project.status,
            )}
          >
            {project.status === "submitted"
              ? "Submitted"
              : project.status || "Draft"}
          </Badge>

          <div className="flex items-center gap-1">
            {project.githubUrl && (
              <Button
                variant="ghost"
                size="icon"
                asChild
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon size={18} />
                </a>
              </Button>
            )}

            {project.demoUrl && (
              <Button
                variant="ghost"
                size="icon"
                asChild
              >
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Project Demo"
                >
                  <ExternalLink size={18} />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}