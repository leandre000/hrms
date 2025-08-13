import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  X,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [isEditing, setIsEditing] = useState(false);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      teamUpdates: true,
      projectUpdates: true,
      performanceReviews: true,
      leaveRequests: true,
    },
    privacy: {
      profileVisibility: "team",
      showOnlineStatus: true,
      allowMessages: true,
      showContactInfo: true,
    },
    appearance: {
      theme: "light",
      language: "en",
      timezone: "UTC-8",
      dateFormat: "MM/DD/YYYY",
    },
  });

  const [editSettings, setEditSettings] = useState(settings);

  const handleSave = () => {
    setSettings(editSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditSettings(settings);
    setIsEditing(false);
  };

  const tabs = [
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "privacy", name: "Privacy & Security", icon: Shield },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "general", name: "General", icon: Settings },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and settings
          </p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-primary">
              <Settings className="w-4 h-4 mr-2" />
              Edit Settings
            </button>
          ) : (
            <>
              <button onClick={handleCancel} className="btn-secondary">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Notification Preferences
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        notifications: {
                          ...editSettings.notifications,
                          email: !editSettings.notifications.email,
                        },
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      (
                        isEditing
                          ? editSettings.notifications.email
                          : settings.notifications.email
                      )
                        ? "bg-primary-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        (
                          isEditing
                            ? editSettings.notifications.email
                            : settings.notifications.email
                        )
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Push Notifications
                    </h4>
                    <p className="text-sm text-gray-500">
                      Receive push notifications in browser
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        notifications: {
                          ...editSettings.notifications,
                          push: !editSettings.notifications.push,
                        },
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      (
                        isEditing
                          ? editSettings.notifications.push
                          : settings.notifications.push
                      )
                        ? "bg-primary-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        (
                          isEditing
                            ? editSettings.notifications.push
                            : settings.notifications.push
                        )
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Team Updates
                    </h4>
                    <p className="text-sm text-gray-500">
                      Notifications about team changes
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        notifications: {
                          ...editSettings.notifications,
                          teamUpdates: !editSettings.notifications.teamUpdates,
                        },
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      (
                        isEditing
                          ? editSettings.notifications.teamUpdates
                          : settings.notifications.teamUpdates
                      )
                        ? "bg-primary-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        (
                          isEditing
                            ? editSettings.notifications.teamUpdates
                            : settings.notifications.teamUpdates
                        )
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Project Updates
                    </h4>
                    <p className="text-sm text-gray-500">
                      Notifications about project progress
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        notifications: {
                          ...editSettings.notifications,
                          projectUpdates:
                            !editSettings.notifications.projectUpdates,
                        },
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      (
                        isEditing
                          ? editSettings.notifications.projectUpdates
                          : settings.notifications.projectUpdates
                      )
                        ? "bg-primary-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        (
                          isEditing
                            ? editSettings.notifications.projectUpdates
                            : settings.notifications.projectUpdates
                        )
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Privacy & Security
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={
                      isEditing
                        ? editSettings.privacy.profileVisibility
                        : settings.privacy.profileVisibility
                    }
                    onChange={(e) =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        privacy: {
                          ...editSettings.privacy,
                          profileVisibility: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="team">Team Members Only</option>
                    <option value="company">Company Wide</option>
                    <option value="public">Public</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Show Online Status
                    </h4>
                    <p className="text-sm text-gray-500">
                      Allow others to see when you're online
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        privacy: {
                          ...editSettings.privacy,
                          showOnlineStatus:
                            !editSettings.privacy.showOnlineStatus,
                        },
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      (
                        isEditing
                          ? editSettings.privacy.showOnlineStatus
                          : settings.privacy.showOnlineStatus
                      )
                        ? "bg-primary-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        (
                          isEditing
                            ? editSettings.privacy.showOnlineStatus
                            : settings.privacy.showOnlineStatus
                        )
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Allow Messages
                    </h4>
                    <p className="text-sm text-gray-500">
                      Allow team members to send you messages
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        privacy: {
                          ...editSettings.privacy,
                          allowMessages: !editSettings.privacy.allowMessages,
                        },
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      (
                        isEditing
                          ? editSettings.privacy.allowMessages
                          : settings.privacy.allowMessages
                      )
                        ? "bg-primary-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        (
                          isEditing
                            ? editSettings.privacy.allowMessages
                            : settings.privacy.allowMessages
                        )
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Appearance</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <select
                    value={
                      isEditing
                        ? editSettings.appearance.theme
                        : settings.appearance.theme
                    }
                    onChange={(e) =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        appearance: {
                          ...editSettings.appearance,
                          theme: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={
                      isEditing
                        ? editSettings.appearance.language
                        : settings.appearance.language
                    }
                    onChange={(e) =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        appearance: {
                          ...editSettings.appearance,
                          language: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={
                      isEditing
                        ? editSettings.appearance.timezone
                        : settings.appearance.timezone
                    }
                    onChange={(e) =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        appearance: {
                          ...editSettings.appearance,
                          timezone: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">UTC</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                General Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={
                      isEditing
                        ? editSettings.appearance.dateFormat
                        : settings.appearance.dateFormat
                    }
                    onChange={(e) =>
                      isEditing &&
                      setEditSettings({
                        ...editSettings,
                        appearance: {
                          ...editSettings.appearance,
                          dateFormat: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete Account
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    This action cannot be undone. All your data will be
                    permanently deleted.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
