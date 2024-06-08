import GenericBanner from "@/components/banners/GenericBanner";
import HotelDisplayCard from "@/components/layout/HotelDisplayCard";
import {useToast} from "@/components/ui/use-toast";
import {useCombinedHotelData, useHotelData} from "@/hooks/useApi";
import {useCurrencyStore} from "@/stores/currency-state";
import React from "react";

export type THotelComparePageProps = {};

export default function HotelComparePage({}: THotelComparePageProps) {
    const {currency} = useCurrencyStore();
    const {toast} = useToast();

    const data = useCombinedHotelData(currency);

    // feature: do not display hotels where details don't exist
    let filteredData = Object.values(data).filter(
        (item) => !!item.name && !!item.description
    );

    // feature: move to back if price not present
    const sortedData = filteredData.sort((a, b) => {
        if (!a.price) return 1;
        if (!b.price) return -1;
        return 0;
    });
    return (
        <div className="container flex flex-col mx-auto gap-4">
            <GenericBanner
                title={"Hotel Compare"}
                subtext={"All your hotels in one place!"}
            />

            <main className="flex flex-col gap-2 px-2">
                {sortedData.map((item) => (
                    <HotelDisplayCard data={item} />
                ))}
            </main>
        </div>
    );
}
