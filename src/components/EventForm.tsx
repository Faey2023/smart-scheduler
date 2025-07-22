import type React from "react";
import { useState } from "react";
import type { CreateEventData, EventFormProps } from "../types/event";
import { CalendarDays, Clock, FileText, Type } from "lucide-react";

const EventForm = ({ onSubmit, onCancel }: EventFormProps) => {
  const [formData, setFormData] = useState<CreateEventData>({
    title: "",
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<CreateEventData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateEventData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ title: "", date: "", time: "", notes: "" });
      setErrors({});
    }
  };

  const handleChange = (field: keyof CreateEventData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <div className="p-1 bg-blue-100 rounded">
            <CalendarDays className="size-4 text-blue-600" />
          </div>
          Add New Event
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1 md:flex items-center gap-2"
              >
                <Type className="size-4" />
                Event Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter event title"
                className={`w-full px-3 py-2 border cursor-pointer rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1 md:flex items-center gap-2"
              >
                <CalendarDays className="size-4" />
                Date *
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className={`w-full px-3 py-2 border cursor-pointer rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1 md:flex items-center gap-2"
              >
                <Clock className="size-4" />
                Time *
              </label>
              <input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className={`w-full px-3 py-2 border cursor-pointer rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.time ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-1 md:flex items-center gap-2"
              >
                <FileText className="size-4" />
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Add any additional notes..."
                rows={3}
                className="w-full px-3 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex-1 sm:flex-none font-medium transition-colors duration-200"
            >
              Add Event
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="border cursor-pointer border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg flex-1 sm:flex-none font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
