import { Scheme } from '../types';

export interface ShareResult {
  shared: boolean;
  copied: boolean;
  error?: string;
}

/**
 * Share a scheme using the Web Share API (navigator.share)
 * with graceful fallback to the Clipboard API (navigator.clipboard).
 */
export async function shareScheme(scheme: Scheme): Promise<ShareResult> {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const portalUrl = scheme.officialPortal || scheme.officialWebsite || currentUrl;

  const title = `${scheme.name} - SchemeSathi`;
  const text = `Check out this government scheme on SchemeSathi:\n\n📜 ${scheme.name}\n💰 Benefit: ${scheme.benefitsHighlight}\n👥 Eligibility: ${scheme.whoCanApply}\n⏰ Deadline: ${scheme.deadline}\n\nOfficial Portal: ${portalUrl}`;

  // 1. Try Web Share API (mobile devices, modern desktop browsers)
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title,
        text,
        url: portalUrl,
      });
      return { shared: true, copied: false };
    } catch (err: any) {
      // AbortError indicates user simply closed the system share dialog
      if (err && err.name === 'AbortError') {
        return { shared: false, copied: false };
      }
      console.warn('Web Share failed, attempting clipboard copy fallback:', err);
    }
  }

  // 2. Fallback to Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${text}`);
      return { shared: false, copied: true };
    } catch (clipErr: any) {
      console.warn('Clipboard writeText failed:', clipErr);
    }
  }

  // 3. Fallback for older browsers or restricted frames
  try {
    const textArea = document.createElement('textarea');
    textArea.value = `${title}\n\n${text}`;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful) {
      return { shared: false, copied: true };
    }
  } catch (legacyErr) {
    console.warn('Legacy execCommand copy failed:', legacyErr);
  }

  return { shared: false, copied: false, error: 'Sharing unavailable' };
}
