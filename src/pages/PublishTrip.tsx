import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Euro, Car, Settings, Info, CheckCircle, AlertCircle } from 'lucide-react';
import {CocovoitTheme} from "../utils/theme.ts";
import type {TripFormData} from "../types";
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const PublishTrip: React.FC = () => {

    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<TripFormData>({
        departure: { address: '', date: '', time: '' },
        arrival: { address: '', estimatedTime: '' },
        passengers: { availableSeats: 1, pricePerSeat: 0 },
        car: { model: '', color: '' },
        preferences: {
            smokingAllowed: false,
            musicAllowed: true,
            petsAllowed: false,
            luggageSpace: true
        },
        description: ''
    });

    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = [
        {
            id: 1,
            title: 'Itinéraire',
            description: 'Où allez-vous ?',
            icon: <MapPin className="w-5 h-5" />
        },
        {
            id: 2,
            title: 'Horaires',
            icon: <Clock className="w-5 h-5" />
        },
        {
            id: 3,
            title: 'Passagers',
            icon: <Users className="w-5 h-5" />
        },
        {
            id: 4,
            title: 'Véhicule',
            icon: <Car className="w-5 h-5" />
        },
        {
            id: 5,
            title: 'Préférences',
            icon: <Settings className="w-5 h-5" />
        }
    ];

    const validateStep = (step: number): boolean => {
        const newErrors: {[key: string]: string} = {};

        switch(step) {
            case 1:
                if (!formData.departure.address) newErrors.departureAddress = 'Adresse de départ requise';
                if (!formData.arrival.address) newErrors.arrivalAddress = 'Adresse d\'arrivée requise';
                break;
            case 2:
                if (!formData.departure.date) newErrors.departureDate = 'Date de départ requise';
                if (!formData.departure.time) newErrors.departureTime = 'Heure de départ requise';
                break;
            case 3:
                if (formData.passengers.availableSeats < 1) newErrors.seats = 'Au moins 1 place requise';
                if (formData.passengers.pricePerSeat < 1) newErrors.price = 'Prix minimum 1€';
                break;
            case 4:
                if (!formData.car.model) newErrors.carModel = 'Modèle de voiture requis';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length));
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Trajet publié:', formData);
            navigate('/search');
        } catch (error) {
            console.error('Erreur lors de la publication:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateFormData = (section: keyof TripFormData, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...(typeof prev[section] === 'object' && prev[section] !== null ? prev[section] : {}),
                [field]: value
            }
        }));
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Publier un trajet
                    </h1>
                    <p className="text-lg text-gray-600">
                        Proposez votre trajet en quelques étapes simples
                    </p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div className={`flex items-center space-x-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                            currentStep >= step.id
                                                ? 'bg-teal-500 text-white'
                                                : 'bg-gray-200 text-gray-500'
                                        }`}
                                    >
                                        {currentStep > step.id ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            step.icon
                                        )}
                                    </div>
                                    <div className="hidden md:block">
                                        <div className={`font-medium ${currentStep >= step.id ? 'text-teal-600' : 'text-gray-500'}`}>
                                            {step.title}
                                        </div>
                                    </div>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`hidden md:block flex-1 h-px mx-4 ${currentStep > step.id ? 'bg-teal-500' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-8">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <MapPin className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre itinéraire</h2>
                                <p className="text-gray-600">Indiquez votre point de départ et d'arrivée</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Adresse de départ *
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.departure.address}
                                            onChange={(e) => updateFormData('departure', 'address', e.target.value)}
                                            placeholder="Ex: Gare du Nord, Paris"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                                errors.departureAddress ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                        />
                                    </div>
                                    {errors.departureAddress && (
                                        <p className="mt-1 text-sm text-red-600">{errors.departureAddress}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Adresse d'arrivée *
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.arrival.address}
                                            onChange={(e) => updateFormData('arrival', 'address', e.target.value)}
                                            placeholder="Ex: Gare Part-Dieu, Lyon"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                                errors.arrivalAddress ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                        />
                                    </div>
                                    {errors.arrivalAddress && (
                                        <p className="mt-1 text-sm text-red-600">{errors.arrivalAddress}</p>
                                    )}
                                </div>

                                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium text-teal-800">Conseil</h4>
                                            <p className="text-sm text-teal-700 mt-1">
                                                Soyez précis dans vos adresses pour faciliter la rencontre avec vos passagers.
                                                Privilégiez les lieux connus comme les gares ou centres commerciaux.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <Clock className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Horaires du trajet</h2>
                                <p className="text-gray-600">Quand voulez-vous partir ?</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date de départ *
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="date"
                                            value={formData.departure.date}
                                            onChange={(e) => updateFormData('departure', 'date', e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                                errors.departureDate ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                        />
                                    </div>
                                    {errors.departureDate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.departureDate}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Heure de départ *
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="time"
                                            value={formData.departure.time}
                                            onChange={(e) => updateFormData('departure', 'time', e.target.value)}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                                errors.departureTime ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                        />
                                    </div>
                                    {errors.departureTime && (
                                        <p className="mt-1 text-sm text-red-600">{errors.departureTime}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Heure d'arrivée estimée (optionnel)
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="time"
                                        value={formData.arrival.estimatedTime}
                                        onChange={(e) => updateFormData('arrival', 'estimatedTime', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Cette information aide les passagers à planifier leur journée
                                </p>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <Users className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Passagers et tarif</h2>
                                <p className="text-gray-600">Combien de places proposez-vous ?</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre de places disponibles *
                                    </label>
                                    <select
                                        value={formData.passengers.availableSeats}
                                        onChange={(e) => updateFormData('passengers', 'availableSeats', parseInt(e.target.value))}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                            errors.seats ? 'border-red-300' : 'border-gray-200'
                                        }`}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                            <option key={num} value={num}>
                                                {num} place{num > 1 ? 's' : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.seats && (
                                        <p className="mt-1 text-sm text-red-600">{errors.seats}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Prix par passager *
                                    </label>
                                    <div className="relative">
                                        <Euro className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="number"
                                            min="1"
                                            max="200"
                                            value={formData.passengers.pricePerSeat}
                                            onChange={(e) => updateFormData('passengers', 'pricePerSeat', parseInt(e.target.value))}
                                            placeholder="25"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                                errors.price ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                        />
                                    </div>
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                                    )}
                                    <p className="mt-1 text-sm text-gray-500">
                                        Couvrez vos frais d'essence et de péage
                                    </p>
                                </div>
                            </div>

                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-orange-800">Conseil tarifaire</h4>
                                        <p className="text-sm text-orange-700 mt-1">
                                            Le prix recommandé pour ce trajet est entre 20€ et 35€ par passager.
                                            Un tarif équitable attire plus de passagers !
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <Car className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre véhicule</h2>
                                <p className="text-gray-600">Aidez vos passagers à vous reconnaître</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Marque et modèle *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.car.model}
                                        onChange={(e) => updateFormData('car', 'model', e.target.value)}
                                        placeholder="Ex: Peugeot 308, Renault Clio..."
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                            errors.carModel ? 'border-red-300' : 'border-gray-200'
                                        }`}
                                    />
                                    {errors.carModel && (
                                        <p className="mt-1 text-sm text-red-600">{errors.carModel}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Couleur
                                    </label>
                                    <select
                                        value={formData.car.color}
                                        onChange={(e) => updateFormData('car', 'color', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="">Sélectionner une couleur</option>
                                        <option value="Blanc">Blanc</option>
                                        <option value="Noir">Noir</option>
                                        <option value="Gris">Gris</option>
                                        <option value="Rouge">Rouge</option>
                                        <option value="Bleu">Bleu</option>
                                        <option value="Vert">Vert</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <Settings className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Préférences de voyage</h2>
                                <p className="text-gray-600">Précisez vos conditions de voyage</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        key: 'musicAllowed',
                                        label: 'Musique autorisée',
                                        description: 'Les passagers peuvent écouter de la musique'
                                    },
                                    {
                                        key: 'smokingAllowed',
                                        label: 'Tabac autorisé',
                                        description: 'Fumeurs acceptés dans le véhicule'
                                    },
                                    {
                                        key: 'petsAllowed',
                                        label: 'Animaux acceptés',
                                        description: 'Les passagers peuvent voyager avec leurs animaux'
                                    },
                                    {
                                        key: 'luggageSpace',
                                        label: 'Espace bagages',
                                        description: 'Suffisamment de place pour les bagages'
                                    }
                                ].map((pref) => (
                                    <div key={pref.key} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                                        <input
                                            type="checkbox"
                                            id={pref.key}
                                            checked={formData.preferences[pref.key as keyof typeof formData.preferences]}
                                            onChange={(e) => updateFormData('preferences', pref.key, e.target.checked)}
                                            className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                        />
                                        <div className="flex-1">
                                            <label htmlFor={pref.key} className="font-medium text-gray-900 cursor-pointer">
                                                {pref.label}
                                            </label>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {pref.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description additionnelle (optionnel)
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => updateFormData('description', '', e.target.value)}
                                    rows={4}
                                    placeholder="Ajoutez des détails sur votre trajet, votre itinéraire exact, ou toute information utile pour vos passagers..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Une description détaillée attire plus de passagers
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-8 border-t border-gray-200">
                        <button
                            onClick={handlePrevStep}
                            disabled={currentStep === 1}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                currentStep === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Précédent
                        </button>

                        {currentStep < steps.length ? (
                            <button
                                onClick={handleNextStep}
                                className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-all"
                                style={{ backgroundColor: CocovoitTheme.primary }}
                            >
                                Suivant
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`px-8 py-3 rounded-lg text-white font-medium transition-all ${
                                    isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'hover:opacity-90'
                                }`}
                                style={{
                                    backgroundColor: isSubmitting ? undefined : CocovoitTheme.primary
                                }}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                        <span>Publication...</span>
                                    </div>
                                ) : (
                                    'Publier le trajet'
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {currentStep >= 3 && (
                    <div className="mt-8 bg-white rounded-2xl shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h3>
                        <div className="space-y-3 text-sm">
                            {formData.departure.address && formData.arrival.address && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Trajet:</span>
                                    <span className="font-medium">{formData.departure.address} → {formData.arrival.address}</span>
                                </div>
                            )}
                            {formData.departure.date && formData.departure.time && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Départ:</span>
                                    <span className="font-medium">{formData.departure.date} à {formData.departure.time}</span>
                                </div>
                            )}
                            {formData.passengers.availableSeats > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Places:</span>
                                    <span className="font-medium">{formData.passengers.availableSeats} passager{formData.passengers.availableSeats > 1 ? 's' : ''}</span>
                                </div>
                            )}
                            {formData.passengers.pricePerSeat > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Prix:</span>
                                    <span className="font-medium text-teal-600">{formData.passengers.pricePerSeat}€ par personne</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
        </Layout>
    );
};

export default PublishTrip;