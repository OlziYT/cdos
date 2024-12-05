import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Trophy, MapPin, Award, ArrowRight } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { useThemeStore } from '../../stores/theme';

export const HomePage = () => {
  const { isDark } = useThemeStore();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      
      {/* Hero Section */}
      <div className={`relative overflow-hidden ${isDark ? 'bg-gradient-to-b from-blue-900 to-blue-800' : 'bg-gradient-to-b from-blue-800 to-blue-600'} pb-32`}>
        <div className="relative pt-16 pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div>
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6">
                    Le sport dans le Tarn
                  </h1>
                  <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Trouvez facilement votre club sportif idéal parmi notre large réseau 
                    d'associations sportives dans le département du Tarn.
                  </p>
                  <div className="mt-10 sm:mt-12">
                    <Link to="/search">
                      <Button 
                        variant={isDark ? "primary-dark" : "primary"} 
                        size="lg" 
                        className="w-full sm:w-auto"
                      >
                        Rechercher un club
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-12 lg:relative lg:m-0">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none rounded-lg shadow-xl"
                    src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Sport dans le Tarn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative -mt-24 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
              <div className="p-6">
                <div className={`${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg p-3 inline-block`}>
                  <Search className={`h-6 w-6 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                </div>
                <h3 className={`mt-4 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recherche simple
                </h3>
                <p className={`mt-2 text-base ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Trouvez rapidement votre club idéal grâce à notre moteur de recherche intuitif.
                </p>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
              <div className="p-6">
                <div className={`${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg p-3 inline-block`}>
                  <MapPin className={`h-6 w-6 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                </div>
                <h3 className={`mt-4 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Carte interactive
                </h3>
                <p className={`mt-2 text-base ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Visualisez tous les clubs sur notre carte interactive pour trouver le plus proche.
                </p>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden sm:col-span-2 lg:col-span-1`}>
              <div className="p-6">
                <div className={`${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg p-3 inline-block`}>
                  <Award className={`h-6 w-6 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                </div>
                <h3 className={`mt-4 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Labels et certifications
                </h3>
                <p className={`mt-2 text-base ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Identifiez les clubs labellisés sport-santé et accessibles aux personnes handicapées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} py-24 sm:py-32`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className={`text-base leading-7 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Clubs sportifs
              </dt>
              <dd className={`order-first text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'} sm:text-5xl`}>
                200+
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className={`text-base leading-7 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Disciplines
              </dt>
              <dd className={`order-first text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'} sm:text-5xl`}>
                40+
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className={`text-base leading-7 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Licenciés
              </dt>
              <dd className={`order-first text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'} sm:text-5xl`}>
                15000+
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};