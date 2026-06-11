let deferred: any = null;
const listeners: Array<() => void> = [];

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    listeners.forEach(fn => fn());
  });
}

export function onInstallReady(fn: () => void) {
  if (deferred) fn();
  else listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i > -1) listeners.splice(i, 1);
  };
}

export function canInstall() { return !!deferred; }

export async function promptInstall(): Promise<boolean> {
  if (!deferred) return false;
  deferred.prompt();
  const choice = await deferred.userChoice;
  if (choice.outcome === 'accepted') deferred = null;
  return choice.outcome === 'accepted';
}
