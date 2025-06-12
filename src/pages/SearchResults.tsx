import React, { useState } from 'react';
import {MapPin, Calendar, Users, Star, Clock, ArrowRight, SlidersHorizontal, Car} from 'lucide-react';
import { Link } from 'react-router-dom';
import {CocovoitTheme} from "../utils/theme.ts";
import type {Trip} from "../types";
import Layout from '../components/layout/Layout';

const SearchResults: React.FC = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('departure');
    const [priceRange, setPriceRange] = useState([0, 100]);

    const [trips] = useState<Trip[]>([
        {
            id: '1',
            driver: {
                name: 'Marie L.',
                rating: 4.8,
                reviewCount: 127,
                avatar: '👩‍💼',
                joinDate: '2022'
            },
            departure: {
                city: 'Paris',
                address: 'Gare du Nord',
                time: '14:30'
            },
            arrival: {
                city: 'Lyon',
                address: 'Gare Part-Dieu',
                time: '18:15'
            },
            price: 32,
            availableSeats: 2,
            duration: '3h45',
            preferences: {
                smokingAllowed: false,
                musicAllowed: true,
                petsAllowed: false
            },
            carInfo: {
                model: 'Peugeot 308',
                color: 'Blanche'
            }
        },
        {
            id: '2',
            driver: {
                name: 'Thomas K.',
                rating: 4.9,
                reviewCount: 89,
                avatar: '👨‍💻',
                joinDate: '2021'
            },
            departure: {
                city: 'Paris',
                address: 'Porte de Versailles',
                time: '16:00'
            },
            arrival: {
                city: 'Lyon',
                address: 'Centre-ville',
                time: '20:00'
            },
            price: 28,
            availableSeats: 3,
            duration: '4h00',
            preferences: {
                smokingAllowed: false,
                musicAllowed: true,
                petsAllowed: true
            },
            carInfo: {
                model: 'Renault Mégane',
                color: 'Grise'
            }
        },
        {
            id: '3',
            driver: {
                name: 'Sophie M.',
                rating: 5.0,
                reviewCount: 234,
                avatar: '👩‍🎨',
                joinDate: '2020'
            },
            departure: {
                city: 'Paris',
                address: 'République',
                time: '19:30'
            },
            arrival: {
                city: 'Lyon',
                address: 'Bellecour',
                time: '23:45'
            },
            price: 35,
            availableSeats: 1,
            duration: '4h15',
            preferences: {
                smokingAllowed: false,
                musicAllowed: false,
                petsAllowed: false
            },
            carInfo: {
                model: 'Volkswagen Golf',
                color: 'Bleue'
            }
        }
    ]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border">
                        <div className="grid md:grid-cols-5 gap-4 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Départ</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        defaultValue="Paris"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Arrivée</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        defaultValue="Lyon"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        defaultValue="2025-06-15"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Passagers</label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    <option>1 passager</option>
                                    <option>2 passagers</option>
                                    <option>3 passagers</option>
                                </select>
                            </div>

                            <button
                                className="py-3 px-6 rounded-lg text-white font-medium hover:opacity-90 transition-all"
                                style={{ backgroundColor: CocovoitTheme.primary }}
                            >
                                Rechercher
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-80">
                        <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <SlidersHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                                        Prix par personne
                                    </label>
                                    <div className="space-y-3">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="w-full"
                                            style={{ accentColor: CocovoitTheme.primary }}
                                        />
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>0€</span>
                                            <span className="font-medium">{priceRange[1]}€</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                                        Heure de départ
                                    </label>
                                    <div className="space-y-2">
                                        {['Matin (6h-12h)', 'Après-midi (12h-18h)', 'Soir (18h-24h)'].map((time) => (
                                            <label key={time} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                                />
                                                <span className="ml-3 text-sm text-gray-700">{time}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                                        Préférences
                                    </label>
                                    <div className="space-y-2">
                                        {[
                                            { id: 'music', label: 'Musique autorisée' },
                                            { id: 'pets', label: 'Animaux acceptés' },
                                            { id: 'luggage', label: 'Gros bagages' }
                                        ].map((pref) => (
                                            <label key={pref.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                                />
                                                <span className="ml-3 text-sm text-gray-700">{pref.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {trips.length} trajets trouvés
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    Paris → Lyon • Demain • 1 passager
                                </p>
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="departure">Heure de départ</option>
                                <option value="price">Prix croissant</option>
                                <option value="duration">Durée</option>
                                <option value="rating">Mieux notés</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            {trips.map((trip) => (
                                <Link
                                    to={`/trip/${trip.id}`}
                                    key={trip.id}
                                    className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer block"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-6 mb-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="text-center">
                                                            <div className="text-xl font-bold text-gray-900">
                                                                {trip.departure.time}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {trip.departure.city}
                                                            </div>
                                                        </div>

                                                        <div className="flex-1 flex items-center space-x-2">
                                                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                                            <div className="flex-1 h-px bg-gray-300"></div>
                                                            <Car className="w-4 h-4 text-gray-400" />
                                                            <div className="flex-1 h-px bg-gray-300"></div>
                                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                        </div>

                                                        <div className="text-center">
                                                            <div className="text-xl font-bold text-gray-900">
                                                                {trip.arrival.time}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {trip.arrival.city}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                                                    <div className="flex items-center space-x-1">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{trip.duration}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Users className="w-4 h-4" />
                                                        <span>{trip.availableSeats} place{trip.availableSeats > 1 ? 's' : ''}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Car className="w-4 h-4" />
                                                        <span>{trip.carInfo.model} {trip.carInfo.color}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-lg">
                                                        {trip.driver.avatar}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">
                                {trip.driver.name}
                              </span>
                                                            <div className="flex items-center space-x-1">
                                                                {renderStars(trip.driver.rating)}
                                                                <span className="text-sm text-gray-600 ml-1">
                                  ({trip.driver.reviewCount})
                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            Membre depuis {trip.driver.joinDate}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right ml-6">
                                                <div className="text-3xl font-bold text-gray-900 mb-2">
                                                    {trip.price}€
                                                </div>
                                                <div className="text-sm text-gray-600 mb-4">
                                                    par personne
                                                </div>
                                                <Link
                                                    to={`/trip/${trip.id}`}
                                                    className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-all transform hover:scale-105 flex items-center space-x-2"
                                                    style={{ backgroundColor: CocovoitTheme.primary }}
                                                >
                                                    <span>Voir détails</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>📍 {trip.departure.address}</span>
                                                <span>📍 {trip.arrival.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">
                                Vous ne trouvez pas votre trajet idéal ?
                            </div>
                            <button
                                className="px-6 py-3 border-2 border-teal-500 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-all"
                            >
                                Créer une alerte de trajet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default SearchResults;