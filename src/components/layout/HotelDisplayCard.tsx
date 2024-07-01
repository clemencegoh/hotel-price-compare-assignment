import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {CurrencyPriceDto, HotelDto} from "@/hooks/useApi";
import {removeHTMLTags} from "@/utils/htmlParser";
import StarRatings from "../ratings/StarRatings";
import {formatForCurrency} from "@/utils/NumberFormatters";
import {useCurrencyStore} from "@/stores/currency-state";
import {CURRENCY_SYMBOLS} from "@/utils/constants";
import _ from "lodash";
import {useState} from "react";
import DisplayTooltip from "./DisplayTooltip";
import PriceWithComparison from "./PriceWithComparison";
import Loading from "../loader/Loading";

export type HotelDisplayCardProps = {
    data: HotelDto & CurrencyPriceDto;
    priceLoading?: boolean;
};

export default function HotelDisplayCard({
    data,
    priceLoading,
}: Readonly<HotelDisplayCardProps>) {
    const {
        photo,
        name,
        description,
        stars,
        address,
        rating,
        price,
        competitors,
        taxes_and_fees,
    } = data;
    const parsedDescription = removeHTMLTags(description);
    const {currency} = useCurrencyStore();

    const [showMore, setShowMore] = useState<boolean>(false);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const mostExpensiveCompetitor = competitors
        ? _.max(Object.values(competitors))
        : undefined;

    const BOOK_THROUGH_US_LABEL = "Book through us";

    const competitorsIncludingUs = Object.entries({
        ...competitors,
        [BOOK_THROUGH_US_LABEL]: price,
    }).sort(([, a], [, b]) => (a ?? 0) - (b ?? 0));

    return (
        <Card className="flex py-2 pl-2 items-start">
            <img
                src={photo}
                className="h-48 w-48 object-cover rounded-md margin-auto"
            />

            <CardHeader>
                <CardTitle className="flex justify-between gap-5">
                    <div className="flex gap-1 flex-1">
                        {name}
                        <StarRatings filledStars={stars} className="pt-1" />
                    </div>

                    <div>
                        <div className="rounded-md bg-primary py-2 px-3">
                            {rating}
                        </div>
                    </div>
                </CardTitle>
                <a
                    href={`https://maps.google.com/?q=${address}`}
                    target="_blank"
                    className="underline text-primary"
                >
                    {address}
                </a>
                <CardDescription className="flex">
                    <span
                        className={`text-ellipsis overflow-hidden ${
                            showMore ? "" : "line-clamp-2"
                        }`}
                    >
                        {parsedDescription}
                    </span>

                    <button
                        className="underline text-disabled text-nowrap flex items-end cursor-pointer"
                        onClick={toggleShowMore}
                    >
                        Show {showMore ? "less" : "more"}
                    </button>
                </CardDescription>
                <section className="w-full flex flex-col items-end">
                    <div className="flex gap-2">
                        {priceLoading ? (
                            <Loading />
                        ) : (
                            <PriceWithComparison
                                price={price}
                                mostExpensiveCompetitor={
                                    mostExpensiveCompetitor
                                }
                            />
                        )}
                        {competitors ? (
                            <DisplayTooltip>
                                {competitorsIncludingUs.map(
                                    ([competitorName, competitorPrice]) => (
                                        <div
                                            key={competitorName}
                                            className={`flex gap-1 ${
                                                competitorName ===
                                                BOOK_THROUGH_US_LABEL
                                                    ? " font-bold"
                                                    : " text-disabled"
                                            }`}
                                            id={competitorName}
                                        >
                                            <span>{competitorName}:</span>
                                            <span>
                                                {
                                                    CURRENCY_SYMBOLS[
                                                        currency ?? "USD"
                                                    ]
                                                }
                                                {formatForCurrency(
                                                    competitorPrice ?? 0,
                                                    currency
                                                )}
                                            </span>
                                        </div>
                                    )
                                )}
                            </DisplayTooltip>
                        ) : (
                            ""
                        )}
                    </div>
                    {taxes_and_fees ? (
                        <DisplayTooltip
                            display={
                                <div className="rounded-md text-sm text-disabled mt-1">
                                    Includes taxes and charges *
                                </div>
                            }
                        >
                            {
                                <div>
                                    <h3>
                                        Hotel Fees:{" "}
                                        {CURRENCY_SYMBOLS[currency ?? "USD"]}
                                        {taxes_and_fees.hotel_fees}
                                    </h3>
                                    <h3>
                                        Tax:{" "}
                                        {CURRENCY_SYMBOLS[currency ?? "USD"]}
                                        {taxes_and_fees.tax}
                                    </h3>
                                </div>
                            }
                        </DisplayTooltip>
                    ) : (
                        ""
                    )}
                </section>
            </CardHeader>
        </Card>
    );
}
