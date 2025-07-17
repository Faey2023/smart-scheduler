import { useEffect, useState } from "react";
import { Plus, Calendar, Loader2 } from "lucide-react";
import type { Event } from "./types/event";
import { fetchEvents, createEvent, deleteEvent, archiveEvent } from "./lib/api";
import EventForm from "./components/EventForm";
import toast from "react-hot-toast";
import EventList from "./components/EventList";

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Failed to load events:", error);
      toast.error("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (
    eventData: Omit<Event, "id" | "category" | "status">
  ) => {
    try {
      await createEvent(eventData);
      const updatedEvents = await fetchEvents();
      setEvents(
        updatedEvents.sort(
          (a, b) =>
            new Date(`${a.date} ${a.time}`).getTime() -
            new Date(`${b.date} ${b.time}`).getTime()
        )
      );
      toast.success("Event created successfully!");
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add event:", err);
      toast.error("Failed to create event. Please check your input.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((event) => event.id !== id));
      toast.success("Event deleted.");
    } catch (err) {
      console.error("Failed to delete event:", err);
      toast.error("Failed to delete event.");
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const updatedEvent = await archiveEvent(id);
      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? { ...event, status: updatedEvent.status } : event
        )
      );

      toast.success(
        updatedEvent.status === "archived" ? "Event archived" : "Event restored"
      );
    } catch (err) {
      console.error("Failed:", err);
      toast.error("Something went wrong");
    }
  };

  const filteredEvents =
    categoryFilter === "All"
      ? events
      : events.filter((event) => event.category === categoryFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Calendar className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Smart Scheduler
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage your events and stay organized
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
          >
            <Plus className="size-4" />
            {showForm ? "Close Form" : "Add Event"}
          </button>
        </div>

        {/* event form */}
        {showForm && (
          <div className="mb-8">
            <EventForm
              onSubmit={handleAddEvent}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="size-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Events ({events.length})
            </h2>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 cursor-pointer border border-gray-300 rounded-md shadow-sm text-sm  focus:outline-none bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* events */}

        <div>
          {loading ? (
            <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-gray-600">
                  <Loader2 className="size-5 animate-spin" />
                  <span>Loading events...</span>
                </div>
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-3 bg-gray-100 rounded-full mb-4">
                  <Calendar className="size-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No events scheduled
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Get started by adding your first event using the "Add Event"
                  button above.
                </p>
              </div>
            </div>
          ) : (
            <EventList
              events={filteredEvents}
              onDelete={handleDelete}
              onArchive={handleArchive}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
