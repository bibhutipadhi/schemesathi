import { Scheme } from '../types';

export interface ApproachingDeadline {
  scheme: Scheme;
  daysRemaining: number;
  deadlineText: string;
  isUrgent: boolean;
}

/**
 * Check if the browser supports the Web Notification API
 */
export function isNotificationSupported(): boolean {
  try {
    return typeof window !== 'undefined' && 'Notification' in window && typeof Notification !== 'undefined';
  } catch (e) {
    return false;
  }
}

/**
 * Get current browser notification permission
 */
export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }
  try {
    return Notification.permission;
  } catch (e) {
    return 'unsupported';
  }
}

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    return 'unsupported';
  }
}

/**
 * Calculate the number of days remaining until a deadline
 */
export function getDaysRemaining(deadlineDateStr?: string, deadlineText?: string): number | null {
  if (deadlineDateStr) {
    const target = new Date(deadlineDateStr);
    if (!isNaN(target.getTime())) {
      const now = new Date();
      // Reset hours to start of day for accurate calendar day difference
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());
      const diffMs = targetMidnight.getTime() - today.getTime();
      return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    }
  }

  // Fallback heuristic from text if deadline text has explicit date or days
  if (deadlineText) {
    const matchDays = deadlineText.match(/closing in (\d+) days?/i);
    if (matchDays && matchDays[1]) {
      return parseInt(matchDays[1], 10);
    }
    if (/closing today/i.test(deadlineText)) {
      return 0;
    }
    if (/closing tomorrow/i.test(deadlineText)) {
      return 1;
    }
  }

  return null;
}

/**
 * Check saved schemes for approaching deadlines (default <= 3 days)
 */
export function getSavedSchemesApproachingDeadlines(
  savedSchemes: Scheme[],
  thresholdDays: number = 3
): ApproachingDeadline[] {
  if (!Array.isArray(savedSchemes)) return [];
  const results: ApproachingDeadline[] = [];

  savedSchemes.forEach((scheme) => {
    if (!scheme || !scheme.id) return;
    const days = getDaysRemaining(scheme.deadlineDate, scheme.deadline);

    if (days !== null) {
      if (days >= 0 && days <= thresholdDays) {
        results.push({
          scheme,
          daysRemaining: days,
          deadlineText: scheme.deadline || 'Closing Soon',
          isUrgent: days <= 1,
        });
      }
    } else if (scheme.status === 'Closing Soon') {
      results.push({
        scheme,
        daysRemaining: 2,
        deadlineText: scheme.deadline || 'Closing Soon',
        isUrgent: false,
      });
    }
  });

  // Sort by earliest deadline first
  return results.sort((a, b) => a.daysRemaining - b.daysRemaining);
}

/**
 * Send a native browser notification if permission is granted
 */
export function sendBrowserNotification(
  title: string,
  options: {
    body: string;
    icon?: string;
    tag?: string;
    onClick?: () => void;
  }
): boolean {
  if (!isNotificationSupported()) {
    return false;
  }

  try {
    if (Notification.permission !== 'granted') {
      return false;
    }

    const notification = new Notification(title, {
      body: options.body,
      icon: options.icon || '/favicon.ico',
      tag: options.tag,
      badge: '/favicon.ico',
    });

    notification.onclick = () => {
      try {
        window.focus();
      } catch (e) {
        // ignore
      }
      if (options.onClick) {
        options.onClick();
      }
      try {
        notification.close();
      } catch (e) {
        // ignore
      }
    };

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Check and notify user about approaching deadlines for their saved schemes
 * Avoids sending duplicate alerts on the same calendar day for the same scheme
 */
export function checkAndNotifyApproachingDeadlines(
  savedSchemes: Scheme[],
  thresholdDays: number = 3,
  onSchemeClick?: (scheme: Scheme) => void
): ApproachingDeadline[] {
  if (!Array.isArray(savedSchemes) || savedSchemes.length === 0) {
    return [];
  }

  const approaching = getSavedSchemesApproachingDeadlines(savedSchemes, thresholdDays);
  if (approaching.length === 0) {
    return [];
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const notifiedCacheKey = 'schemesathi_notified_deadlines';
  let notifiedMap: Record<string, string> = {};

  try {
    const raw = localStorage.getItem(notifiedCacheKey);
    if (raw) {
      notifiedMap = JSON.parse(raw);
    }
  } catch (e) {
    notifiedMap = {};
  }

  // Filter schemes that have not been notified today
  const unnotified = approaching.filter((item) => {
    return item?.scheme?.id && notifiedMap[item.scheme.id] !== todayStr;
  });

  if (unnotified.length > 0) {
    // Send notification for the most urgent scheme or a digest
    if (unnotified.length === 1) {
      const item = unnotified[0];
      const dayLabel =
        item.daysRemaining === 0
          ? 'today'
          : item.daysRemaining === 1
          ? 'tomorrow'
          : `in ${item.daysRemaining} days`;

      sendBrowserNotification(`⏰ Deadline Alert: ${item.scheme.name || 'Saved Scheme'}`, {
        body: `Application deadline is closing ${dayLabel} (${item.deadlineText}). Don't miss your benefits!`,
        tag: `deadline-${item.scheme.id}`,
        onClick: () => onSchemeClick && onSchemeClick(item.scheme),
      });
    } else {
      sendBrowserNotification(`⏰ ${unnotified.length} Scheme Deadlines Approaching!`, {
        body: `${unnotified.map((i) => i.scheme?.name || 'Scheme').slice(0, 2).join(', ')} and more close within ${thresholdDays} days.`,
        tag: 'deadline-digest',
        onClick: () => onSchemeClick && onSchemeClick(unnotified[0].scheme),
      });
    }

    // Mark as notified today
    unnotified.forEach((item) => {
      if (item?.scheme?.id) {
        notifiedMap[item.scheme.id] = todayStr;
      }
    });

    try {
      localStorage.setItem(notifiedCacheKey, JSON.stringify(notifiedMap));
    } catch (e) {
      // ignore
    }
  }

  return approaching;
}
