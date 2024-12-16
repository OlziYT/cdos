import React, { useEffect } from 'react';
import { useChristmasThemeStore } from '../stores/christmasTheme';

export const ThemeSelector: React.FC = () => {
    const { isChristmasTheme, setChristmasTheme } = useChristmasThemeStore();

    useEffect(() => {
        // Appliquer le thème au chargement
        document.documentElement.setAttribute('data-theme', isChristmasTheme ? 'christmas' : 'default');
    }, [isChristmasTheme]);

    const handleThemeChange = () => {
        setChristmasTheme(!isChristmasTheme);
    };

    // Vérifier si nous sommes en période de Noël (du 1er décembre au 31 décembre)
    const isChristmasSeason = () => {
        const today = new Date();
        const month = today.getMonth(); // 0-11
        return month === 11; // Décembre
    };

    useEffect(() => {
        // Activer automatiquement le thème de Noël pendant la période
        if (isChristmasSeason()) {
            setChristmasTheme(true);
        }
    }, []);

    return (
        <div className="theme-selector">
            <button
                onClick={handleThemeChange}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                {isChristmasTheme ? (
                    <>
                        <span>Thème classique</span>
                    </>
                ) : (
                    <>
                        <span>Thème de Noël</span>
                        {isChristmasSeason() && '🎄'}
                    </>
                )}
            </button>
        </div>
    );
};

export default ThemeSelector;
