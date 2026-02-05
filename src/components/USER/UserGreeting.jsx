/**
 * UserGreeting.jsx
 * =================
 * Displays a personalized greeting for logged-in users.
 * 
 * USAGE:
 * Place this component anywhere you want to show "Hello, username 👋"
 * 
 * PROPS: None - uses AuthContext internally
 */

import { useAuth } from "../../context/AuthContext";

export default function UserGreeting() {
  // Get user info from auth context
  const { user, isAuthenticated } = useAuth();

  // Don't render anything if user is not logged in
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="user-greeting-banner">
      <p>Hello, {user} 👋</p>
      <span className="greeting-subtitle">Welcome back to StyleHub!</span>
    </div>
  );
}
