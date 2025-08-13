import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = [
    {
      id: 1,
      title: "Team Standup",
      type: "meeting",
      date: "2024-12-16",
      time: "9:00 AM",
      duration: 15,
      attendees: ["Sarah Chen", "David Kim", "Emily Watson"],
      location: "Conference Room A",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      title: "Project Review",
      type: "meeting",
      date: "2024-12-16",
      time: "2:00 PM",
      duration: 60,
      attendees: ["Mike Smith", "Sarah Chen", "Alex Rodriguez"],
      location: "Virtual",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 3,
      title: "Performance Review - Sarah",
      type: "review",
      date: "2024-12-17",
      time: "10:00 AM",
      duration: 45,
      attendees: ["Mike Smith", "Sarah Chen"],
      location: "Private Room",
      color: "bg-green-100 text-green-800",
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateString);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">View team schedules and events</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </button>
      </div>

      {/* Calendar Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {formatDate(currentDate)}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                  )
                )
              }
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Today
            </button>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                  )
                )
              }
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {/* Day Headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="bg-gray-50 p-3 text-center">
              <span className="text-sm font-medium text-gray-500">{day}</span>
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((day, index) => (
            <div
              key={index}
              className={`bg-white min-h-32 p-2 ${
                day && day.toDateString() === new Date().toDateString()
                  ? "ring-2 ring-primary-500"
                  : ""
              }`}
            >
              {day && (
                <>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {getEventsForDate(day).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded ${event.color} cursor-pointer hover:opacity-80`}
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className="font-medium truncate">
                          {event.title}
                        </div>
                        <div className="text-xs opacity-75">{event.time}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Events for{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>

          <div className="space-y-4">
            {getEventsForDate(selectedDate).map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {event.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {event.time} ({event.duration}min)
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Attendees: </span>
                      <span className="text-sm text-gray-900">
                        {event.attendees.join(", ")}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${event.color}`}
                  >
                    {event.type}
                  </span>
                </div>
              </div>
            ))}

            {getEventsForDate(selectedDate).length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No events scheduled for this date
              </p>
            )}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Upcoming Events
        </h3>
        <div className="space-y-4">
          {events
            .filter((event) => new Date(event.date) >= new Date())
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .slice(0, 5)
            .map((event) => (
              <div
                key={event.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className={`p-2 rounded-lg ${event.color}`}>
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${event.color}`}
                >
                  {event.type}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
