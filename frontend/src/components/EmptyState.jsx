import { FolderOpen } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  description = "There is nothing to display right now.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-white px-5 py-14 text-center">
      <div className="rounded-full bg-gray-100 p-4 text-gray-500">
        <FolderOpen size={28} />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}