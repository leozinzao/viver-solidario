
import { LucideProps, Home, Heart, User, Plus, UserPlus, LogOut, Edit, History, Moon } from "lucide-react";

// Custom icon for volunteer activism
export const VolunteerActivism = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 12c-2-2.96-4-4-4.5-4.5-1-.97-1.37-2.5-.5-3.5.87-1 2.5-1 3.5 0 .8.8 1.5 3 1.5 3s.7-2.2 1.5-3c1-1 2.63-1 3.5 0 .87 1 .5 2.53-.5 3.5-.5.5-2.5 1.5-4.5 4.5z" />
    <path d="M16 17h6m-3-3v6" />
    <path d="M8.4 17C5.1 17 2 19 2 21.5C2 22.9 3.1 24 4.5 24H12c0-1.5.5-2.5 2-3c.5-1.5 2-2 3-2c0-1 0-2.5-1.5-2.5H8.4z" />
    <path d="M7 11v5" />
    <path d="M13 11v5" />
  </svg>
);

export const Event = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

export const Campaign = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8l2 2m4-4L6 22M11 2a6 6 0 0 0-5 9l5 5a6 6 0 0 0 9-5" />
  </svg>
);

export const MonetizationOn = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9c-1-.5-3-.5-4 0M8 12h8M9 15c1 .5 3 .5 4 0" />
  </svg>
);

export { Home, Heart, User, Plus, UserPlus, LogOut, Edit, History, Moon };
