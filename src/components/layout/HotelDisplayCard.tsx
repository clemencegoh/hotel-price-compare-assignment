import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {CurrencyPriceDto, HotelDto} from "@/hooks/useApi";
import {removeHTMLTags} from "@/utils/htmlParser";
import StarRatings from "../ratings/StarRatings";
import {formatForCurrency} from "@/utils/numberFormatters";
import {useCurrencyStore} from "@/stores/currency-state";
import {CURRENCY_SYMBOLS} from "@/utils/constants";
import _ from "lodash";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Big from "big.js";
import {doRiskyBigOperation} from "@/utils/numbers";

export type HotelDisplayCardProps = {
    data: HotelDto & CurrencyPriceDto;
};

export default function HotelDisplayCard({data}: HotelDisplayCardProps) {
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

    console.log("tax and fees for ", currency, taxes_and_fees);

    // find how cheap we are compared to the rest
    const rankingByCheapness = competitors
        ? Object.values(competitors).filter((competitor) => competitor < price)
              .length
        : 0;
    const cheapRankingText = (rank: number) => {
        switch (rank) {
            case 0:
                return "Cheapest Option!";
            case 1:
                return "2nd Cheapest Option";
            case 2:
                return "3rd Cheapest Option";
            default:
                return `${rank + 1}th Cheapest Option`;
        }
    };

    const mostExpensiveCompetitor = competitors
        ? _.max(Object.values(competitors))
        : undefined;

    const savings = doRiskyBigOperation(() =>
        new Big(mostExpensiveCompetitor ?? 0)
            .minus(price)
            .div(mostExpensiveCompetitor ?? 1)
            .mul(100)
    );

    return (
        <Card className="flex py-2 pl-2">
            <img
                src={photo}
                className="aspect-square bg-cover w-48 rounded-md"
            />
            <CardHeader>
                <CardTitle className="flex justify-between gap-5">
                    <div className="flex gap-1 flex-1">
                        {name}{" "}
                        <StarRatings filledStars={stars} className="pt-1" />
                    </div>

                    <div>
                        <div className="rounded-md bg-primary py-2 px-3">
                            {rating}
                        </div>
                    </div>
                </CardTitle>
                <CardDescription>
                    <a
                        href={`https://maps.google.com/?q=${address}`}
                        target="_blank"
                        className="underline text-primary"
                    >
                        {address}
                    </a>
                </CardDescription>
                <CardDescription className="text-ellipsis overflow-hidden line-clamp-2">
                    {parsedDescription}
                </CardDescription>
                <CardContent className="w-full flex flex-col items-end">
                    <div className="flex gap-2">
                        {mostExpensiveCompetitor && (
                            <div className="rounded-md bg-positive text-white px-2 py-1">
                                Save {savings.toFixed(2)}%
                            </div>
                        )}
                        {mostExpensiveCompetitor && (
                            <span className="text-negative line-through flex gap-1 text-sm flex items-center">
                                {CURRENCY_SYMBOLS[currency ?? "USD"]}
                                {formatForCurrency(
                                    mostExpensiveCompetitor,
                                    currency
                                )}
                            </span>
                        )}
                        {price ? (
                            <h1 className="font-bold text-xl flex gap-1 items-center">
                                {CURRENCY_SYMBOLS[currency ?? "USD"]}
                                {formatForCurrency(price, currency)}
                            </h1>
                        ) : (
                            <h1 className="text-error">Rates unavailable</h1>
                        )}
                        {competitors ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                            />
                                        </svg>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-white py-4 px-2 rounded-md border-1 border-black">
                                        <p>
                                            {cheapRankingText(
                                                rankingByCheapness
                                            )}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            ""
                        )}
                    </div>
                    {taxes_and_fees ? (
                        <div className="rounded-md text-sm text-disabled">
                            Includes taxes and charges
                        </div>
                    ) : (
                        ""
                    )}
                </CardContent>
            </CardHeader>
        </Card>
    );
}
