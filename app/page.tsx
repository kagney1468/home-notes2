'use client';

import App from '../components/App';

// Force dynamic — Firebase Auth cannot run during static prerendering
export const dynamic = 'force-dynamic';

export default function Page() {
  return <App />;
}
