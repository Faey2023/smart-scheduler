import type { CreateEventData, Event } from "../types/event";

const BASE_URL = "https://smart-scheduler-server.onrender.com/events";

export const fetchEvents = async (): Promise<Event[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch events");
  const json = await res.json();
  console.log("API response:", json);
  return json.data;
};

export const createEvent = async (
  eventData: CreateEventData
): Promise<Event> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
};

export const deleteEvent = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete event");
};

export const archiveEvent = async (
  id: string
): Promise<{ id: string; status: string }> => {
  const res = await fetch(`${BASE_URL}/${id}/archive`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Failed to archive event");
  return res.json();
};
