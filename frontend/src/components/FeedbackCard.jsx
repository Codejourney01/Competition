import { MessageSquare, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function FeedbackCard({ feedback }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-3 text-blue-600">
            <MessageSquare size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {feedback.mentor}
            </h3>

            <p className="text-sm text-gray-500">
              {feedback.project}
            </p>
          </div>
        </div>

        <StatusBadge status={feedback.status} />
      </div>

      <p className="mt-5 text-sm leading-6 text-gray-600">
        {feedback.message}
      </p>

      <div className="mt-5 flex items-center gap-2 border-t pt-4 text-xs text-gray-500">
        <Calendar size={15} />
        {feedback.date}
      </div>
    </div>
  );
}