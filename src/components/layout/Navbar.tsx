import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { CocovoitTheme } from '../../utils/theme';
import type {NavbarProps} from "../../types";

const Navbar: React.FC<NavbarProps> = ({ variant = 'default' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActiveLink = (path: string) => {
        return location.pathname === path;
    };

    const getNavbarClasses = () => {
        const baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300";

        if (variant === 'home') {
            return `${baseClasses} ${
                scrolled
                    ? 'bg-white shadow-lg backdrop-blur-sm'
                    : 'bg-white/95'
            }`;
        }

        return `${baseClasses} bg-white shadow-sm border-b`;
    };

    return (
        <header className={getNavbarClasses()}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-3">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: CocovoitTheme.primary }}
                        >
                            CCV
                        </div>
                        <span
                            className="text-xl font-bold"
                            style={{ color: CocovoitTheme.gray900 }}
                        >
              Cocovoit
            </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/search"
                            className={`font-medium transition-colors ${
                                isActiveLink('/search')
                                    ? 'text-teal-600 border-b-2 border-teal-600 pb-1'
                                    : 'text-gray-700 hover:text-gray-900'
                            }`}
                        >
                            Rechercher
                        </Link>
                        <Link
                            to="/publish"
                            className={`font-medium transition-colors ${
                                isActiveLink('/publish')
                                    ? 'text-teal-600 border-b-2 border-teal-600 pb-1'
                                    : 'text-gray-700 hover:text-gray-900'
                            }`}
                        >
                            Publier
                        </Link>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                        >
                            Comment ça marche
                        </a>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                            Se connecter
                        </button>
                        <button
                            className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-all transform hover:scale-105"
                            style={{ backgroundColor: CocovoitTheme.primary }}
                        >
                            S'inscrire
                        </button>

                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="w-6 h-6" style={{ color: CocovoitTheme.gray700 }} />
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-3">
                            <Link
                                to="/search"
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Rechercher
                            </Link>
                            <Link
                                to="/publish"
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Publier
                            </Link>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                Comment ça marche
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;