import type { ReactNode } from 'react';

/** A restrained route-entry transition; the browser still navigates immediately. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-transition">{children}</div>;
}
