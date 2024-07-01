import {render} from "@testing-library/react";
import {TestID} from "@/utils/testConstants";
import PriceWithComparison from "./PriceWithComparison";

describe("PriceWithComparison component", () => {
    it("shows rates unavailable without price", async () => {
        const component = render(<PriceWithComparison />);
        expect(
            component.getByTestId(TestID.RATES_UNAVAILABLE).textContent
        ).toBe("Rates unavailable");
    });

    it("shows rates unavailable without price", async () => {
        const component = render(<PriceWithComparison />);
        expect(
            component.getByTestId(TestID.RATES_UNAVAILABLE).textContent
        ).toBe("Rates unavailable");
    });
});
