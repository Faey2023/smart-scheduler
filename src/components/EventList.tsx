import { Calendar, Loader2 } from "lucide-react";

import type { EventListProps } from "../types/event";
import EventCard from "./EventCard";

const EventList = ({
  events,
  loading,
  onDelete,
  onArchive,
}: EventListProps) => {
  if (loading) {
    return (
      <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-600">
            <Loader2 className="size-5 animate-spin" />
            <span>Loading events...</span>
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-3 bg-gray-100 rounded-full mb-4">
            <Calendar className="size-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No events scheduled
          </h3>
          <p className="text-gray-600 max-w-sm">
            Get started by adding your first event using the "Add Event" button
            above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
};
export default EventList;
