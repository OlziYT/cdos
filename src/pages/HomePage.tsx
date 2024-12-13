import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Button } from "../components/ui/Button";
import { useThemeStore } from "../stores/theme";

export const HomePage = () => {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1
            className={`text-4xl font-bold tracking-tight sm:text-6xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Le sport dans le Tarn
          </h1>
          <p
            className={`mt-6 text-lg leading-8 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Trouvez facilement votre club sportif idéal parmi notre large réseau
            d'associations sportives dans le département du Tarn.
          </p>
          <Link to="/search">
            <Button
              variant="primary"
              size="lg"
              isDark={isDark}
              className="mt-8 inline-flex items-center"
            >
              Rechercher un club
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
