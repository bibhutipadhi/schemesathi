import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellRing, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Clock, 
  Settings2, 
  Sparkles, 
  X, 
  Check, 
  Calendar,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Scheme } from '../types';
import { 
  isNotificationSupported, 
  getNotificationPermission, 
  requestNotificationPermission, 
  sendBrowserNotification,
  getSavedSchemesApproachingDeadlines,
  ApproachingDeadline 
} from '../utils/notificationService';

interface DeadlineNotificationCenterProps {
  savedSchemes: Scheme[];
  onViewDetails: (scheme: Scheme) => void;
  onNavigateToSaved: () => void;
  thresholdDays: number;
  onUpdateThresholdDays: (days: number) => void;
  onTriggerTestAlert: () => void;
}

export const DeadlineNotificationCenter: React.FC<DeadlineNotificationCenterProps> = ({
  savedSchemes,
  onViewDetails,
  onNavigateToSaved,
  thresholdDays,
  onUpdateThresholdDays,
  onTriggerTestAlert,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [isRequesting, setIsRequesting] = useState(false);

  // Update permission state
  useEffect(() => {
    setPermission(getNotificationPermission());
  }, []);

  // Compute approaching deadlines for saved schemes
  const approachingList = getSavedSchemesApproachingDeadlines(savedSchemes, thresholdDays);
  const urgentCount = approachingList.length;

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    const result = await requestNotificationPermission();
    setPermission(result);
    setIsRequesting(false);

    if (result === 'granted') {
      sendBrowserNotification('🔔 SchemeSathi Alerts Active', {
        body: `You will now receive local browser alerts ${thresholdDays} days before application deadlines for your saved schemes.`,
        tag: 'welcome-alert',
      });
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon Trigger Button */}
      <button
        id="deadline-notification-bell"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
          urgentCount > 0
            ? 'text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 ring-2 ring-amber-400/50'
            : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
        }`}
        title="Deadline Notification Alerts"
        aria-label="View Deadline Notifications"
      >
        {urgentCount > 0 ? (
          <BellRing className="w-5 h-5 text-amber-700 animate-bounce" />
        ) : (
          <Bell className="w-5 h-5" />
        )}

        {/* Counter Badge */}
        {urgentCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-pulse">
            {urgentCount}
          </span>
        )}
      </button>

      {/* Dropdown Flyout Panel */}
      {isOpen && (
        <>
          {/* Backdrop on mobile */}
          <div 
            className="fixed inset-0 z-50 bg-stone-950/20 sm:hidden" 
            onClick={() => setIsOpen(false)} 
          />

          <div 
            id="deadline-notification-flyout"
            className="fixed inset-x-4 top-20 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-96 max-w-sm bg-white rounded-2xl shadow-2xl border border-stone-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
          >
            {/* Header */}
            <div className="p-4 bg-linear-to-r from-stone-900 to-stone-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-serif leading-tight">Deadline Alerts</h3>
                  <p className="text-[11px] text-stone-300">Local browser notifications for saved schemes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Browser Permission Banner */}
            <div className="p-3.5 bg-stone-50 border-b border-stone-200 text-xs">
              {permission === 'granted' ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Browser notifications enabled</span>
                  </div>
                  <button
                    onClick={onTriggerTestAlert}
                    className="text-[11px] text-amber-800 font-bold hover:underline cursor-pointer"
                  >
                    Send Test Alert
                  </button>
                </div>
              ) : permission === 'denied' ? (
                <div className="text-stone-700">
                  <div className="flex items-center gap-1 text-amber-800 font-bold mb-0.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Browser notifications are blocked</span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Enable notifications in your browser address bar to get system popups. In-app alerts will still trigger.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-stone-800">Stay Ahead of Deadlines</p>
                      <p className="text-[11px] text-stone-600">Get browser reminders 3 days before saved schemes close.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      id="enable-browser-notifications-btn"
                      onClick={handleRequestPermission}
                      disabled={isRequesting}
                      className="w-full py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <BellRing className="w-3.5 h-3.5" />
                      <span>{isRequesting ? 'Requesting...' : 'Enable Browser Notifications'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Threshold Selector */}
            <div className="px-4 py-2.5 bg-white border-b border-stone-100 flex items-center justify-between text-xs text-stone-600">
              <span className="font-medium flex items-center gap-1">
                <Settings2 className="w-3.5 h-3.5 text-stone-500" />
                <span>Notify when deadline is:</span>
              </span>
              <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg">
                {[3, 5, 7].map((days) => (
                  <button
                    key={days}
                    onClick={() => onUpdateThresholdDays(days)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                      thresholdDays === days
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    {days}d
                  </button>
                ))}
              </div>
            </div>

            {/* List of Approaching Deadlines */}
            <div className="max-h-72 overflow-y-auto p-3 space-y-2 divide-y divide-stone-100">
              {approachingList.length > 0 ? (
                approachingList.map(({ scheme, daysRemaining, deadlineText }) => (
                  <div 
                    key={scheme.id} 
                    className="pt-2 first:pt-0 group hover:bg-stone-50 p-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase ${
                            daysRemaining <= 1
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {daysRemaining === 0 ? 'Closes Today' : daysRemaining === 1 ? 'Closes Tomorrow' : `${daysRemaining} Days Left`}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {scheme.category}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-amber-800">
                          {scheme.name}
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          Deadline: <strong>{deadlineText}</strong>
                        </p>
                      </div>

                      {/* Quick Action */}
                      <button
                        onClick={() => {
                          onViewDetails(scheme);
                          setIsOpen(false);
                        }}
                        className="shrink-0 text-xs text-amber-700 hover:text-amber-900 font-semibold p-1 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        title="View Scheme Details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-stone-100">
                      <button
                        onClick={() => {
                          onViewDetails(scheme);
                          setIsOpen(false);
                        }}
                        className="text-stone-600 hover:text-stone-900 font-medium hover:underline cursor-pointer"
                      >
                        View Checklist
                      </button>
                      {scheme.officialPortal && (
                        <a
                          href={scheme.officialPortal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 px-4 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-stone-800">No Imminent Deadlines</p>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    None of your {savedSchemes.length} saved schemes are closing in the next {thresholdDays} days.
                  </p>
                  <button
                    onClick={() => {
                      onNavigateToSaved();
                      setIsOpen(false);
                    }}
                    className="mt-2 text-xs text-amber-700 hover:text-amber-900 font-semibold hover:underline cursor-pointer inline-block"
                  >
                    View All Saved Schemes →
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  onNavigateToSaved();
                  setIsOpen(false);
                }}
                className="text-stone-700 hover:text-stone-900 font-semibold hover:underline cursor-pointer"
              >
                Saved Schemes ({savedSchemes.length})
              </button>
              <button
                onClick={onTriggerTestAlert}
                className="text-amber-800 hover:text-amber-950 font-bold hover:underline cursor-pointer"
              >
                Test Alert
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
