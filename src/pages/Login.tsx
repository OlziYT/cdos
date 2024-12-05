import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800">
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center">
            <Trophy className="h-12 w-12 text-white" />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            CDOS Tarn Platform
          </h2>
          <p className="mt-2 text-center text-sm text-blue-200">
            Connectez-vous pour accéder à votre espace
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl ring-1 ring-gray-900/10 sm:rounded-lg sm:px-10">
            <LoginForm />
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Informations de connexion
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Email: admin@cdos81.fr
                  <br />
                  Mot de passe: admin123456789
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};