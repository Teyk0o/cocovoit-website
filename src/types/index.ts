import React from "react";

export interface LayoutProps {
    children: React.ReactNode;
    variant?: 'home' | 'default';
    showNavbar?: boolean;
}

export interface NavbarProps {
    variant?: 'home' | 'default';
}

export interface TripFormData {
    departure: {
        address: string;
        date: string;
        time: string;
    };
    arrival: {
        address: string;
        estimatedTime: string;
    };
    passengers: {
        availableSeats: number;
        pricePerSeat: number;
    };
    car: {
        model: string;
        color: string;
    };
    preferences: {
        smokingAllowed: boolean;
        musicAllowed: boolean;
        petsAllowed: boolean;
        luggageSpace: boolean;
    };
    description: string;
}

export interface Trip {
    id: string;
    driver: {
        name: string;
        rating: number;
        reviewCount: number;
        avatar: string;
        joinDate: string;
    };
    departure: {
        city: string;
        address: string;
        time: string;
    };
    arrival: {
        city: string;
        address: string;
        time: string;
    };
    price: number;
    availableSeats: number;
    duration: string;
    preferences: {
        smokingAllowed: boolean;
        musicAllowed: boolean;
        petsAllowed: boolean;
    };
    carInfo: {
        model: string;
        color: string;
    };
}

export interface TripDetailData {
    id: string;
    driver: {
        name: string;
        rating: number;
        reviewCount: number;
        avatar: string;
        joinDate: string;
        verified: boolean;
        bio: string;
        responseRate: number;
        responseTime: string;
    };
    route: {
        departure: {
            city: string;
            address: string;
            time: string;
            coordinates: [number, number];
        };
        arrival: {
            city: string;
            address: string;
            time: string;
            coordinates: [number, number];
        };
        distance: number;
        duration: string;
        waypoints: Array<{
            city: string;
            address: string;
            time: string;
        }>;
    };
    booking: {
        pricePerSeat: number;
        availableSeats: number;
        totalSeats: number;
        instantBooking: boolean;
    };
    vehicle: {
        model: string;
        color: string;
        year: number;
        comfort: 'standard' | 'premium' | 'luxury';
    };
    preferences: {
        smokingAllowed: boolean;
        musicAllowed: boolean;
        petsAllowed: boolean;
        luggageSpace: boolean;
        maxDetour: number;
    };
    description: string;
    reviews: Array<{
        id: string;
        reviewer: string;
        rating: number;
        comment: string;
        date: string;
        tripDate: string;
    }>;
    createdAt: string;
}
