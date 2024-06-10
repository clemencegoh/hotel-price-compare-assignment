import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import {BaseProps} from "@/utils/props";
import {TestID} from "@/utils/testConstants";

export type TDisplayTooltipProps = BaseProps & {
    display?: React.ReactNode;
};

export default function DisplayTooltip({
    children,
    display,
}: Readonly<TDisplayTooltipProps>) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger data-testid={TestID.TOOLTIP_BUTTON}>
                    {display ? (
                        display
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                            data-testid={TestID.TOOLTIP_DEFAULT_ICON}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            />
                        </svg>
                    )}
                </TooltipTrigger>
                <TooltipContent
                    data-testid={TestID.TOOLTIP_CONTENT}
                    className="bg-white py-4 px-4 py-2 rounded-md bg-[#7bb6f1] max-h-40 overflow-auto"
                >
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
