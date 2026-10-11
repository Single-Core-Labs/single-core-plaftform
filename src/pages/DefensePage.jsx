import { Navigate } from 'react-router-dom'

/* Legacy URL alias — the canonical Defense page lives at /industries/defense. */
export default function DefensePage() {
  return <Navigate to="/industries/defense" replace />
}
