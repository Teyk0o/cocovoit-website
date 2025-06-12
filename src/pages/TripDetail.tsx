import React, { useState } from 'react';
import {
    Users,
    Star,
    Car,
    Shield,
    MessageCircle,
    Phone,
    CheckCircle,
    X,
    ArrowLeft,
    Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {CocovoitTheme} from "../utils/theme.ts";
import type {TripDetailData} from "../types";
import Layout from '../components/layout/Layout';

const TripDetail: React.FC = () => {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState(1);
    const [bookingMessage, setBookingMessage] = useState('');
    const [showContactModal, setShowContactModal] = useState(false);

    const trip: TripDetailData = {
        id: 'trip-123',
        driver: {
            name: 'Marie Laurent',
            rating: 4.8,
            reviewCount: 127,
            avatar: '👩‍💼',
            joinDate: '2022',
            verified: true,
            bio: 'Conductrice expérimentée, j\'adore rencontrer de nouvelles personnes pendant mes trajets ! Toujours ponctuelle et bonne humeur garantie 😊',
            responseRate: 95,
            responseTime: '2h en moyenne'
        },
        route: {
            departure: {
                city: 'Paris',
                address: 'Gare du Nord - 18 Rue de Dunkerque',
                time: '14:30',
                coordinates: [2.355, 48.881]
            },
            arrival: {
                city: 'Lyon',
                address: 'Gare Part-Dieu - Place Charles Béraudier',
                time: '18:15',
                coordinates: [4.860, 45.761]
            },
            distance: 463,
            duration: '3h45',
            waypoints: [
                { city: 'Fontainebleau', address: 'Centre-ville', time: '15:15' },
                { city: 'Mâcon', address: 'Sortie autoroute', time: '17:30' }
            ]
        },
        booking: {
            pricePerSeat: 32,
            availableSeats: 2,
            totalSeats: 3,
            instantBooking: true
        },
        vehicle: {
            model: 'Peugeot 308',
            color: 'Blanche',
            year: 2021,
            comfort: 'standard'
        },
        preferences: {
            smokingAllowed: false,
            musicAllowed: true,
            petsAllowed: false,
            luggageSpace: true,
            maxDetour: 10
        },
        description: 'Trajet régulier Paris-Lyon que je fais tous les vendredis pour le travail. Départ ponctuel garanti ! Je peux faire un petit détour pour vous déposer en centre-ville si besoin. Ambiance détendue, on peut discuter ou écouter de la musique selon vos préférences.',
        reviews: [
            {
                id: '1',
                reviewer: 'Thomas K.',
                rating: 5,
                comment: 'Excellent trajet avec Marie ! Très ponctuelle, conduite souple et conversation agréable. Je recommande vivement.',
                date: '2025-05-15',
                tripDate: '2025-05-10'
            },
            {
                id: '2',
                reviewer: 'Sophie M.',
                rating: 5,
                comment: 'Parfait ! Marie est une conductrice exemplaire, très arrangeante pour les horaires et très sympathique.',
                date: '2025-04-22',
                tripDate: '2025-04-18'
            },
            {
                id: '3',
                reviewer: 'Alex D.',
                rating: 4,
                comment: 'Très bon trajet, juste un peu de retard au départ mais Marie a prévenu. Sinon rien à redire !',
                date: '2025-04-08',
                tripDate: '2025-04-05'
            }
        ],
        createdAt: '2025-06-10'
    };

    const renderStars = (rating: number, size: string = 'w-4 h-4') => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`${size} ${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleBooking = () => {
        console.log('Réservation:', {
            tripId: trip.id,
            seats: selectedSeats,
            message: bookingMessage
        });
        setShowBookingModal(false);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <Link
                        to="/search"
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Retour aux résultats</span>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {trip.route.departure.city} → {trip.route.arrival.city}
                                    </h1>
                                    <p className="text-gray-600">
                                        {formatDate('2025-06-15')} • {trip.route.duration} de trajet
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-gray-900">
                                        {trip.booking.pricePerSeat}€
                                    </div>
                                    <div className="text-sm text-gray-600">par personne</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                                        <div className="w-px h-16 bg-gray-300"></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-4 mb-2">
                      <span className="text-xl font-bold text-gray-900">
                        {trip.route.departure.time}
                      </span>
                                            <span className="text-lg font-medium text-gray-900">
                        {trip.route.departure.city}
                      </span>
                                        </div>
                                        <p className="text-gray-600">{trip.route.departure.address}</p>
                                    </div>
                                </div>

                                {trip.route.waypoints.map((waypoint, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                            <div className="w-px h-16 bg-gray-300"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-2">
                        <span className="text-lg font-medium text-gray-700">
                          {waypoint.time}
                        </span>
                                                <span className="text-lg text-gray-900">
                          {waypoint.city}
                        </span>
                                            </div>
                                            <p className="text-gray-600">{waypoint.address}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-start space-x-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-4 mb-2">
                      <span className="text-xl font-bold text-gray-900">
                        {trip.route.arrival.time}
                      </span>
                                            <span className="text-lg font-medium text-gray-900">
                        {trip.route.arrival.city}
                      </span>
                                        </div>
                                        <p className="text-gray-600">{trip.route.arrival.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Navigation className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">{trip.route.distance} km</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">
                      {trip.booking.availableSeats} place{trip.booking.availableSeats > 1 ? 's' : ''} sur {trip.booking.totalSeats}
                    </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Car className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">
                      {trip.vehicle.model} {trip.vehicle.color} ({trip.vehicle.year})
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                À propos de ce trajet
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {trip.description}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Préférences de voyage
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {
                                        key: 'musicAllowed',
                                        allowed: trip.preferences.musicAllowed,
                                        label: 'Musique autorisée',
                                        icon: '🎵'
                                    },
                                    {
                                        key: 'smokingAllowed',
                                        allowed: trip.preferences.smokingAllowed,
                                        label: 'Tabac autorisé',
                                        icon: '🚭'
                                    },
                                    {
                                        key: 'petsAllowed',
                                        allowed: trip.preferences.petsAllowed,
                                        label: 'Animaux acceptés',
                                        icon: '🐕'
                                    },
                                    {
                                        key: 'luggageSpace',
                                        allowed: trip.preferences.luggageSpace,
                                        label: 'Espace bagages',
                                        icon: '🧳'
                                    }
                                ].map((pref) => (
                                    <div key={pref.key} className="flex items-center space-x-3">
                                        <span className="text-lg">{pref.icon}</span>
                                        <span className={`font-medium ${pref.allowed ? 'text-green-600' : 'text-red-600'}`}>
                      {pref.allowed ? '✓' : '✗'}
                    </span>
                                        <span className="text-gray-700">{pref.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <span>Détour maximum accepté:</span>
                                    <span className="font-medium">{trip.preferences.maxDetour} km</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Avis des passagers ({trip.reviews.length})
                                </h3>
                                <div className="flex items-center space-x-2">
                                    {renderStars(trip.driver.rating)}
                                    <span className="font-medium text-gray-900">
                    {trip.driver.rating}
                  </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {trip.reviews.map((review) => (
                                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="font-medium text-gray-900">{review.reviewer}</div>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    {renderStars(review.rating)}
                                                    <span className="text-sm text-gray-500">
                            Trajet du {formatDate(review.tripDate)}
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-6">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                                    {trip.driver.avatar}
                                </div>
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {trip.driver.name}
                                    </h3>
                                    {trip.driver.verified && (
                                        <CheckCircle className="w-5 h-5 text-blue-500" />
                                    )}
                                </div>
                                <div className="flex items-center justify-center space-x-2 mb-3">
                                    {renderStars(trip.driver.rating)}
                                    <span className="text-sm text-gray-600">
                    ({trip.driver.reviewCount} avis)
                  </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Membre depuis {trip.driver.joinDate}
                                </p>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {trip.driver.bio}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                                <div>
                                    <div className="text-lg font-bold text-gray-900">
                                        {trip.driver.responseRate}%
                                    </div>
                                    <div className="text-xs text-gray-600">Taux de réponse</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-gray-900">
                                        {trip.driver.responseTime}
                                    </div>
                                    <div className="text-xs text-gray-600">Temps de réponse</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowContactModal(true)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Contacter</span>
                                </button>

                                <button
                                    onClick={() => setShowBookingModal(true)}
                                    className="w-full px-4 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-all"
                                    style={{ backgroundColor: CocovoitTheme.primary }}
                                >
                                    {trip.booking.instantBooking ? 'Réservation instantanée' : 'Demander à réserver'}
                                </button>

                                <div className="text-center">
                  <span className="text-sm text-gray-500">
                    {trip.booking.availableSeats} place{trip.booking.availableSeats > 1 ? 's' : ''} disponible{trip.booking.availableSeats > 1 ? 's' : ''}
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Informations pratiques</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center space-x-2">
                                    <Shield className="w-4 h-4 text-green-500" />
                                    <span className="text-gray-700">Conducteur vérifié</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-gray-700">Annulation gratuite jusqu'à 24h avant</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-blue-500" />
                                    <span className="text-gray-700">Numéro de téléphone partagé après réservation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showBookingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Réserver ce trajet</h3>
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre de places
                                </label>
                                <select
                                    value={selectedSeats}
                                    onChange={(e) => setSelectedSeats(parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    {Array.from({ length: trip.booking.availableSeats }, (_, i) => i + 1).map(num => (
                                        <option key={num} value={num}>
                                            {num} place{num > 1 ? 's' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message au conducteur (optionnel)
                                </label>
                                <textarea
                                    value={bookingMessage}
                                    onChange={(e) => setBookingMessage(e.target.value)}
                                    rows={3}
                                    placeholder="Présentez-vous ou posez une question..."
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                />
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700">Prix par place :</span>
                                    <span className="font-medium">{trip.booking.pricePerSeat}€</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700">Nombre de places :</span>
                                    <span className="font-medium">{selectedSeats}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-900">Total :</span>
                                        <span className="font-bold text-xl text-teal-600">
                      {trip.booking.pricePerSeat * selectedSeats}€
                    </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                className="w-full px-4 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-all"
                                style={{ backgroundColor: CocovoitTheme.primary }}
                            >
                                Confirmer la réservation
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showContactModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Contacter {trip.driver.name}</h3>
                            <button
                                onClick={() => setShowContactModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
              <textarea
                  placeholder="Posez votre question à Marie..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />

                            <button
                                className="w-full px-4 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-all"
                                style={{ backgroundColor: CocovoitTheme.primary }}
                            >
                                Envoyer le message
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </Layout>
    );
};

export default TripDetail;