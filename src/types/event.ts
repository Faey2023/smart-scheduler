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
export interface EventListProps {
  events: Event[];
  loading?: boolean;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
}
