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
import { useChristmasThemeStore } from "./stores/christmasTheme";
import ThemeSelector from "./components/ThemeSelector";
import "./styles/christmas-theme.css";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const Snowflakes = () => {
  const { isChristmasTheme } = useChristmasThemeStore();
  if (!isChristmasTheme) return null;
  
  return (
    <>
      {[...Array(9)].map((_, i) => (
        <div key={i} className="snowflake">❄</div>
      ))}
    </>
  );
};

const ChristmasLights = () => {
  const { isChristmasTheme } = useChristmasThemeStore();
  
  if (!isChristmasTheme) return null;

  // Créer un tableau de 25 ampoules
  const lights = Array.from({ length: 25 }, (_, i) => (
    <span key={i} />
  ));

  return (
    <div className="christmas-lights">
      {lights}
    </div>
  );
};

const SantaSleigh = () => {
  const { isChristmasTheme } = useChristmasThemeStore();
  const [gifts, setGifts] = React.useState<{ id: number; x: number }[]>([]);

  React.useEffect(() => {
    if (!isChristmasTheme) return;

    const dropGift = () => {
      const x = Math.random() * window.innerWidth;
      const newGift = { id: Date.now(), x };
      setGifts(prev => [...prev, newGift]);
      setTimeout(() => {
        setGifts(prev => prev.filter(g => g.id !== newGift.id));
      }, 3000);
    };

    const interval = setInterval(() => {
      dropGift();
    }, 1000);

    return () => clearInterval(interval);
  }, [isChristmasTheme]);

  if (!isChristmasTheme) return null;

  return (
    <>
      <div className="santa-sleigh" />
      {gifts.map(gift => (
        <div
          key={gift.id}
          className="gift"
          style={{ '--gift-x': `${gift.x}px` } as React.CSSProperties}
        >
          {['🎁', '🎀', '🎊'][Math.floor(Math.random() * 3)]}
        </div>
      ))}
    </>
  );
};

function App() {
  // Initialiser le thème de Noël
  const { isChristmasTheme } = useChristmasThemeStore();
  
  React.useEffect(() => {
    // Appliquer le thème au chargement et lors des changements
    document.documentElement.setAttribute('data-theme', isChristmasTheme ? 'christmas' : 'default');
  }, [isChristmasTheme]);

  return (
    <BrowserRouter>
      <div className="relative" style={{ 
        background: 'linear-gradient(135deg, #1a472a, #2d5a27)',
        minHeight: '100vh',
        color: '#ffffff'
      }}>
        <ChristmasLights />
        <SantaSleigh />
        <Snowflakes />
        <div className="absolute top-4 right-4 z-50">
          <ThemeSelector />
        </div>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
