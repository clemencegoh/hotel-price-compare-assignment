import GenericBanner from "@/components/banners/GenericBanner";
import HotelDisplayCard from "@/components/layout/HotelDisplayCard";
import Loading from "@/components/loader/Loading";
import {useCombinedHotelData} from "@/hooks/useApi";
import {useCurrencyStore} from "@/stores/currency-state";

export default function HotelComparePage() {
    const {currency} = useCurrencyStore();

    const {combinedData, isLoading} = useCombinedHotelData(currency);

    // feature: do not display hotels where details don't exist
    let filteredData = combinedData.filter(
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
            <main className="flex flex-col gap-2 px-2 items-center">
                {sortedData.length > 0 ? (
                    sortedData?.map((item) => (
                        <HotelDisplayCard
                            data={item}
                            key={item.id}
                            priceLoading={isLoading}
                        />
                    ))
                ) : (
                    <Loading />
                )}
            </main>
        </div>
    );
}
