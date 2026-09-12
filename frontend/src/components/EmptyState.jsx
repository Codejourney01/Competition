import { FolderOpen } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  description = "There is nothing to display right now.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-card px-5 py-14 text-center text-card-foreground">
      <div className="rounded-full bg-muted p-4 text-muted-foreground">
        <FolderOpen size={28} />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}