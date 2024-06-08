import {useCurrencyStore} from "@/stores/currency-state";
import {SUPPORTED_CURRENCIES} from "@/utils/constants";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {TestID} from "@/utils/testConstants";

export type TGenericBannerProps = {
    title: string;
    subtext?: string;
};

export default function GenericBanner({
    title,
    subtext,
}: Readonly<TGenericBannerProps>) {
    const {currency, setCurrency} = useCurrencyStore();
    console.log(currency);
    return (
        <header className="flex w-screen justify-between px-3 pt-2 items-center">
            <div id="name-and-description" className="">
                <h1 className="tx-h1">{title}</h1>
                <h3>{subtext}</h3>
            </div>
            <div id="currency-and-language" className="border-2 rounded-sm">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        data-testid={TestID.CURRENCY_BUTTON}
                        className="px-2"
                    >
                        {currency}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {SUPPORTED_CURRENCIES.map((item) => (
                            <DropdownMenuItem
                                key={`${item}`}
                                className="hover:cursor-pointer"
                                data-testid={`${TestID.CURRENCY_OPTION}_${item}`}
                                onClick={() => {
                                    setCurrency(item);
                                }}
                            >
                                {item}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
