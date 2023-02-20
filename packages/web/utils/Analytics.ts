const Tracking = {
  pageView(): void {
    if (!window) return;

    const w = window as unknown as any;

    if (w.gtag) w.gtag('pageview', window.location.pathname + window.location.search);
    if (w.fbq) w.fbq('track', 'PageView');
    if (w.mixpanel) w.mixpanel.track('Page View');
  },

  identify(userId: string): void {
    if (!window) return;

    const w = window as unknown as any;

    if (w.tag) w.gtag('set', { 'user_id': userId });
    if (w.mixpanel) w.mixpanel.identify(userId);
  },

  setUserDetails(details: Record<string, unknown>): void {
    if (!window) return;

    const w = window as unknown as any;

    if (w.mixpanel) w.mixpanel.people.set(details);
  },

  event(name: string, data: Record<string, unknown> = {}): void {
    if (!window) return;

    const w = window as unknown as any;

    if (w.gtag) w.gtag('event', name, data);
    if (w.fbq) w.fbq('trackCustom', name, data);
    if (w.mixpanel) w.mixpanel.track(name, data);
  }
};

export default Tracking;
