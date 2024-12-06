import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 h-16 sticky top-0 z-50">
      <nav className="h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">CDOS Tarn</span>
            </Link>
          </div>
          
          <button
            className="relative group p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};