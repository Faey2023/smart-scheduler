import {
  Calendar,
  Clock,
  FileText,
  Trash2,
  ArchiveX,
  ArchiveRestore,
} from "lucide-react";
import { format } from "date-fns";
import type { Event, EventCardProps } from "../types/event";

const EventCard = ({ event, onDelete, onArchive }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(":");
      const date = new Date();
      date.setHours(Number.parseInt(hours), Number.parseInt(minutes));
      return format(date, "h:mm a");
    } catch {
      return timeString;
    }
  };

  const getCategoryStyles = (category: Event["category"]) => {
    switch (category) {
      case "Work":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Personal":
        return "bg-green-100 text-green-800 border-green-200";
      case "Other":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* details */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {event.title}
              </h3>
              <span
                className={`${getCategoryStyles(
                  event.category
                )} text-xs font-medium px-2 py-1 rounded-full border self-start sm:self-auto`}
              >
                {event.category}
              </span>
            </div>

            {/* date & time */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{formatTime(event.time)}</span>
              </div>
            </div>

            {event.notes && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <FileText className="size-4 mt-0.5 flex-shrink-0" />
                <p className="line-clamp-2">{event.notes}</p>
              </div>
            )}
          </div>

          <div className="flex sm:flex-col gap-2 self-start">
            {event.status === "archived" ? (
              <button
                onClick={() => onArchive(event.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex-1 sm:flex-none"
              >
                <ArchiveX className="size-4 cursor-pointer" />
                <span className="sm:hidden">Archive</span>
              </button>
            ) : (
              <button
                onClick={() => onArchive(event.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex-1 sm:flex-none"
              >
                <ArchiveRestore className="size-4 cursor-pointer" />
                <span className="sm:hidden">Archive</span>
              </button>
            )}

            <button
              onClick={() => onDelete(event.id)}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex-1 sm:flex-none"
            >
              <Trash2 className="size-4 cursor-pointer" />
              <span className="sm:hidden">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
