import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/public/HomePage';
import { SearchPage } from './pages/public/SearchPage';
import { LoginPage } from './pages/Login';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { CommitteesPage } from './pages/committees/CommitteesPage';
import { NewCommitteePage } from './pages/committees/NewCommitteePage';
import { EditCommitteePage } from './pages/committees/EditCommitteePage';
import { ClubsPage } from './pages/clubs/ClubsPage';
import { NewClubPage } from './pages/clubs/NewClubPage';
import { EditClubPage } from './pages/clubs/EditClubPage';
import { getAuthStore } from './stores/auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = getAuthStore();
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
          <Route path="statistics" element={<div>Statistics (Coming soon)</div>} />
          <Route path="settings" element={<div>Settings (Coming soon)</div>} />
          <Route index element={<Navigate to="/dashboard/committees" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;