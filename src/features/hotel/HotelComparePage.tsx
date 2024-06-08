import GenericBanner from "@/components/banners/GenericBanner";
import {useHotelData} from "@/hooks/useApi";
import React from "react";

export type THotelComparePageProps = {};

export default function HotelComparePage({}: THotelComparePageProps) {
    const {data} = useHotelData();

    return (
        <>
            <GenericBanner
                title={"Hotel Compare"}
                subtext={"All your hotels in one place!"}
            />
        </>
    );
}
