import { MessageSquare, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function FeedbackCard({ feedback }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm sm:p-5 text-card-foreground">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-500/10 p-3 text-blue-600">
            <MessageSquare size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              {feedback.mentor}
            </h3>

            <p className="text-sm text-muted-foreground">
              {feedback.project}
            </p>
          </div>
        </div>

        <div className="self-start">
          <StatusBadge status={feedback.status} />
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {feedback.message}
      </p>

      <div className="mt-4 flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
        <Calendar size={15} />
        {feedback.date}
      </div>
    </div>
  );
}