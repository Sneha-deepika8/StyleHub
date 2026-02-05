/**
 * ProtectedRoute.jsx
 * ===================
 * A wrapper component that protects routes from unauthenticated access.
 * 
 * HOW IT WORKS:
 * - Checks if user is logged in via AuthContext
 * - If logged in: renders the child component
 * - If NOT logged in: redirects to /login
 * 
 * USAGE:
 * <Route path="/collections" element={
 *   <ProtectedRoute>
 *     <Collections />
 *   </ProtectedRoute>
 * } />
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  // Get authentication status from context
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected content
  return children;
}
