import React from "react";

export type THotelDisplayCardProps = {
    title: string;
    description: string;
    rating: number;
    stars: number;
    address: string;
    photo: string;
    price: number;
    competitors?: Record<string, number>;
    taxes_and_fees?: {
        tax: number;
        hotel_fees: number;
    };
};

export default function HotelDisplayCard({}: THotelDisplayCardProps) {
    return <></>;
}
