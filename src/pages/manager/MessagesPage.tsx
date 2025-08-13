import {
  MessageSquare,
  Send,
  Search,
  Filter,
  MoreVertical,
  User,
  Clock,
  Check,
  CheckCheck,
} from "lucide-react";
import { useState } from "react";

const MessagesPage = () => {
  const [selectedContact, setSelectedContact] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const contacts = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Senior Developer",
      avatar: "SC",
      lastMessage: "Thanks for the feedback on the API integration",
      lastMessageTime: "2 min ago",
      unreadCount: 0,
      online: true,
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      position: "UI/UX Designer",
      avatar: "AR",
      lastMessage: "Can we discuss the new design requirements?",
      lastMessageTime: "1 hour ago",
      unreadCount: 2,
      online: false,
    },
    {
      id: 3,
      name: "David Kim",
      position: "Backend Developer",
      avatar: "DK",
      lastMessage: "Database optimization is complete",
      lastMessageTime: "3 hours ago",
      unreadCount: 0,
      online: true,
    },
    {
      id: 4,
      name: "Emily Watson",
      position: "Frontend Developer",
      avatar: "EW",
      lastMessage: "Component testing finished successfully",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      online: false,
    },
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      text: "Hi Mike, I have a question about the project timeline",
      timestamp: "9:00 AM",
      status: "read",
    },
    {
      id: 2,
      senderId: 0, // 0 for current user
      text: "Hi Sarah, sure! What would you like to know?",
      timestamp: "9:05 AM",
      status: "read",
    },
    {
      id: 3,
      senderId: 1,
      text: "I think we might need an extra week for the API integration",
      timestamp: "9:10 AM",
      status: "read",
    },
    {
      id: 4,
      senderId: 0,
      text: "Let me review the current progress and get back to you",
      timestamp: "9:15 AM",
      status: "read",
    },
    {
      id: 5,
      senderId: 1,
      text: "Thanks for the feedback on the API integration",
      timestamp: "2 min ago",
      status: "read",
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedContactData = contacts.find((c) => c.id === selectedContact);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add message logic here
      setMessageText("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedContact === contact.id
                  ? "bg-primary-50 border-primary-200"
                  : ""
              }`}
              onClick={() => setSelectedContact(contact.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {contact.avatar}
                    </span>
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {contact.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {contact.lastMessage}
                  </p>
                </div>
                {contact.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                    {contact.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContactData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedContactData.avatar}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedContactData.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedContactData.position}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === 0
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div
                      className={`flex items-center justify-end space-x-1 mt-1 ${
                        message.senderId === 0
                          ? "text-primary-200"
                          : "text-gray-500"
                      }`}
                    >
                      <span className="text-xs">{message.timestamp}</span>
                      {message.senderId === 0 && (
                        <span>
                          {message.status === "read" ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a contact
              </h3>
              <p className="text-gray-500">
                Choose someone to start a conversation
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
