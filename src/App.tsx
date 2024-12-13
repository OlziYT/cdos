import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ClubsPage } from "./pages/clubs/ClubsPage";
import { EditClubPage } from "./pages/clubs/EditClubPage";
import { NewClubPage } from "./pages/clubs/NewClubPage";
import { CommitteesPage } from "./pages/committees/CommitteesPage";
import { EditCommitteePage } from "./pages/committees/EditCommitteePage";
import { NewCommitteePage } from "./pages/committees/NewCommitteePage";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/public/HomePage";
import { SearchPage } from "./pages/public/SearchPage";
import { useAuthStore } from "./stores/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="committees" element={<CommitteesPage />} />
          <Route path="committees/new" element={<NewCommitteePage />} />
          <Route path="committees/:id/edit" element={<EditCommitteePage />} />
          <Route path="clubs" element={<ClubsPage />} />
          <Route path="clubs/new" element={<NewClubPage />} />
          <Route path="clubs/:id/edit" element={<EditClubPage />} />
          <Route
            path="statistics"
            element={<div>Statistics (Coming soon)</div>}
          />
          <Route path="settings" element={<div>Settings (Coming soon)</div>} />
          <Route
            index
            element={<Navigate to="/dashboard/committees" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
