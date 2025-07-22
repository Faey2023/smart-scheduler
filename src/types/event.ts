export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: "Work" | "Personal" | "Other";
  status: string;
}

export type CreateEventData = Omit<Event, "id" | "category" | "status">;
