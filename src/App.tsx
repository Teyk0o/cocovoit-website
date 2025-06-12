import React, { useState, useEffect } from 'react';
import { Car, Users, ArrowRight, MapPin, Calendar, Shield, Search, Menu } from 'lucide-react';

const CocovoitTheme = {
    primary: '#00B8A9',
    primaryHover: '#00A396',
    primaryLight: '#E6F9F7',

    secondary: '#FF6B35',
    secondaryHover: '#E55A2B',
    secondaryLight: '#FFF0EC',

    gray900: '#1A1D29',
    gray800: '#2D3748',
    gray700: '#4A5568',
    gray600: '#718096',
    gray400: '#CBD5E0',
    gray200: '#EDF2F7',
    gray100: '#F7FAFC',

    white: '#FFFFFF',
    success: '#48BB78',
    warning: '#ED8936',
    error: '#F56565'
};

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: <Search className="w-6 h-6" />,
            title: "Recherche Intelligente",
            description: "Trouvez le trajet parfait en quelques secondes",
            stat: "2M+ trajets disponibles"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Voyage Sécurisé",
            description: "Profils vérifiés et assurance incluse",
            stat: "99.9% de trajets sans incident"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Communauté Active",
            description: "Rencontrez des voyageurs de confiance",
            stat: "4.8/5 note moyenne"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-white shadow-lg backdrop-blur-sm'
                        : 'bg-white/95'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
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
                        </div>

                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                                Rechercher
                            </a>
                            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                                Publier
                            </a>
                            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
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
                </div>
            </header>

            <section className="pt-24 pb-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1
                            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                            style={{ color: CocovoitTheme.gray900 }}
                        >
                            Voyagez autrement avec{' '}
                            <span style={{ color: CocovoitTheme.primary }}>Cocovoit</span>
                        </h1>

                        <p
                            className="text-xl md:text-2xl mb-8 leading-relaxed"
                            style={{ color: CocovoitTheme.gray600 }}
                        >
                            Le covoiturage moderne qui transforme vos trajets en moments mémorables.
                            Simple, sûr et surprenant.
                        </p>

                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-8 max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Départ</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="D'où partez-vous ?"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Arrivée</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Où allez-vous ?"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="date"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        className="w-full py-3 px-6 rounded-lg text-white font-medium hover:opacity-90 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                                        style={{ backgroundColor: CocovoitTheme.primary }}
                                    >
                                        <Search className="w-5 h-5" />
                                        <span>Rechercher</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                className="px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center space-x-2"
                                style={{
                                    backgroundColor: CocovoitTheme.secondaryLight,
                                    color: CocovoitTheme.secondary
                                }}
                            >
                                <Car className="w-5 h-5" />
                                <span>Proposer un trajet</span>
                            </button>

                            <button
                                className="px-8 py-3 rounded-lg border-2 font-medium hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                                style={{
                                    borderColor: CocovoitTheme.gray400,
                                    color: CocovoitTheme.gray700
                                }}
                            >
                                <span>Comment ça marche ?</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20" style={{ backgroundColor: CocovoitTheme.gray100 }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2
                            className="text-4xl font-bold mb-6"
                            style={{ color: CocovoitTheme.gray900 }}
                        >
                            Pourquoi choisir Cocovoit ?
                        </h2>
                        <p
                            className="text-xl max-w-3xl mx-auto"
                            style={{ color: CocovoitTheme.gray600 }}
                        >
                            Une technologie de pointe au service de voyages authentiques et sécurisés
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white"
                                    style={{ backgroundColor: CocovoitTheme.primary }}
                                >
                                    {feature.icon}
                                </div>

                                <h3
                                    className="text-xl font-bold mb-4"
                                    style={{ color: CocovoitTheme.gray900 }}
                                >
                                    {feature.title}
                                </h3>

                                <p
                                    className="mb-4 leading-relaxed"
                                    style={{ color: CocovoitTheme.gray600 }}
                                >
                                    {feature.description}
                                </p>

                                <p
                                    className="text-sm font-semibold"
                                    style={{ color: CocovoitTheme.primary }}
                                >
                                    {feature.stat}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="py-20"
                style={{ backgroundColor: CocovoitTheme.primary }}
            >
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Rejoignez la communauté Cocovoit
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Des milliers de voyageurs nous font déjà confiance pour leurs trajets quotidiens
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="px-8 py-4 bg-white rounded-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105"
                            style={{ color: CocovoitTheme.primary }}
                        >
                            Créer mon compte gratuitement
                        </button>
                        <button
                            className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
                        >
                            En savoir plus
                        </button>
                    </div>
                </div>
            </section>

            <footer
                className="py-16"
                style={{ backgroundColor: CocovoitTheme.gray900 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                                    style={{ backgroundColor: CocovoitTheme.primary }}
                                >
                                    CCV
                                </div>
                                <span className="text-xl font-bold text-white">Cocovoit</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed max-w-md">
                                La plateforme de covoiturage nouvelle génération qui rend vos trajets plus humains,
                                plus sûrs et plus économiques.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Produit</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Comment ça marche</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Sécurité</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Support</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Cocovoit. Plateforme développée avec une architecture microservices moderne.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;