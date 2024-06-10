import {render} from "@testing-library/react";
import GenericBanner from "./GenericBanner";
import {useCurrencyStore} from "@/stores/currency-state";
import {TestID} from "@/utils/testConstants";
import userEvent from "@testing-library/user-event";

jest.mock("@/stores/currency-state", () => ({
    useCurrencyStore: jest.fn(() => ({
        currency: "USD",
        setCurrency: jest.fn(),
    })),
}));

describe("GenericBanner component", () => {
    it("renders title and subtext", () => {
        const component = render(
            <GenericBanner title="My Banner" subtext="Some description" />
        );

        const titleElement = component.getByText("My Banner");
        const subtextElement = component.getByText("Some description");

        expect(titleElement).toBeDefined();
        expect(subtextElement).toBeDefined();
    });

    it("displays current currency", () => {
        const component = render(<GenericBanner title="My Banner" />);

        const currencyElement = component.getByText("USD");

        expect(currencyElement).toBeDefined();
    });

    it("opens currency dropdown on button click", async () => {
        const component = render(<GenericBanner title="My Banner" />);

        const currencyButton = component.getByTestId(TestID.CURRENCY_BUTTON);

        // @ts-expect-error: radix-ui's Dropdown uses Pointer-touch exclusively now
        await userEvent.click(currencyButton, {pointerType: "touch"});

        const dropdownMenu = component.getByTestId(TestID.DROPDOWN_MENU_LABEL);

        expect(dropdownMenu).toBeDefined();
    });

    it("calls setCurrency on currency option click", async () => {
        const mockSetCurrency = jest.fn();
        jest.mocked(useCurrencyStore).mockReturnValue({
            currency: "USD",
            setCurrency: mockSetCurrency,
        });

        const component = render(<GenericBanner title="My Banner" />);

        const currencyButton = component.getByTestId(TestID.CURRENCY_BUTTON);

        // @ts-expect-error: radix-ui's Dropdown uses Pointer-touch exclusively now
        await userEvent.click(currencyButton, {pointerType: "touch"});

        const euroOption = component.getByTestId(
            `${TestID.CURRENCY_OPTION}_KRW`
        );
        await userEvent.click(euroOption);

        expect(mockSetCurrency).toHaveBeenCalledWith("KRW");
    });
});
