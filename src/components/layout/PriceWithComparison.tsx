import {useCurrencyStore} from "@/stores/currency-state";
import {CURRENCY_SYMBOLS} from "@/utils/constants";
import {formatForCurrency} from "@/utils/numberFormatters";
import {doRiskyBigOperation} from "@/utils/numbers";
import Big from "big.js";

export type TPriceWithComparisonProps = {
    price?: number;
    mostExpensiveCompetitor?: number;
};

export default function PriceWithComparison({
    price,
    mostExpensiveCompetitor,
}: Readonly<TPriceWithComparisonProps>) {
    const {currency} = useCurrencyStore();
    const savings = doRiskyBigOperation(() =>
        new Big(mostExpensiveCompetitor ?? 0)
            .minus(price ?? 0)
            .div(mostExpensiveCompetitor ?? 1)
            .mul(100)
    );
    return (
        <>
            {mostExpensiveCompetitor && (
                <div className="rounded-md bg-positive text-white px-2 py-1">
                    Save {savings.toFixed(2)}%
                </div>
            )}
            {mostExpensiveCompetitor && (
                <span className="text-negative line-through flex gap-1 text-sm flex items-center">
                    {CURRENCY_SYMBOLS[currency ?? "USD"]}
                    {formatForCurrency(mostExpensiveCompetitor, currency)}
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
        </>
    );
}
