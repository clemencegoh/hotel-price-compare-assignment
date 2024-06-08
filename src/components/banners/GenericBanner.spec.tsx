import {fireEvent, render} from "@testing-library/react";
import GenericBanner from "./GenericBanner";
import {useCurrencyStore} from "@/stores/currency-state";
import {TestID} from "@/utils/testConstants";

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

    it("opens currency dropdown on button click", () => {
        const component = render(<GenericBanner title="My Banner" />);

        const currencyButton = component.getByTestId(TestID.CURRENCY_BUTTON);

        fireEvent.click(currencyButton);

        const dropdownMenu = component.getByRole("listbox");

        expect(dropdownMenu).toBeDefined();
    });

    it("calls setCurrency on currency option click", () => {
        const mockSetCurrency = jest.fn();
        jest.mocked(useCurrencyStore).mockReturnValue({
            currency: "USD",
            setCurrency: mockSetCurrency,
        });

        const component = render(<GenericBanner title="My Banner" />);

        const currencyButton = component.getByTestId(TestID.CURRENCY_BUTTON);
        fireEvent.click(currencyButton);

        const euroOption = component.getByTestId(
            `${TestID.CURRENCY_OPTION}_EUR`
        );
        fireEvent.click(euroOption);

        expect(mockSetCurrency).toHaveBeenCalledWith("EUR");
    });
});
