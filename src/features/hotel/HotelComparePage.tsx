import GenericBanner from "@/components/banners/GenericBanner";
import {useToast} from "@/components/ui/use-toast";
import {useCombinedHotelData, useHotelData} from "@/hooks/useApi";
import {useCurrencyStore} from "@/stores/currency-state";
import React from "react";

export type THotelComparePageProps = {};

export default function HotelComparePage({}: THotelComparePageProps) {
    const {currency} = useCurrencyStore();
    const {toast} = useToast();

    useCombinedHotelData();
    return (
        <>
            <GenericBanner
                title={"Hotel Compare"}
                subtext={"All your hotels in one place!"}
            />
            <button
                onClick={() => {
                    toast({
                        title: "hello",
                        description: "worldd",
                    });
                }}
            >
                Click me
            </button>
        </>
    );
}
