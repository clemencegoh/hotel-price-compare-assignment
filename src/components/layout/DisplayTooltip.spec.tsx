import {render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DisplayTooltip from "./DisplayTooltip";
import {TestID} from "@/utils/testConstants";

describe("DisplayTooltip component", () => {
    it("renders tooltip content on hover", async () => {
        const content = "This is some tooltip content.";
        const component = render(<DisplayTooltip>{content}</DisplayTooltip>);
        const button = component.getByTestId(TestID.TOOLTIP_BUTTON);
        expect(button).toBeDefined();

        userEvent.hover(button);
        await waitFor(
            () => {
                expect(
                    component.getByTestId(TestID.TOOLTIP_CONTENT)
                ).toBeDefined();
            },
            {
                timeout: 5000,
            }
        );

        const tooltipContent = component.getByTestId(TestID.TOOLTIP_CONTENT);

        expect(tooltipContent.innerHTML).toContain(content);
    });

    it("renders default icon if no display prop is provided", () => {
        const component = render(
            <DisplayTooltip>This is some tooltip content.</DisplayTooltip>
        );

        const icon = component.getByTestId(TestID.TOOLTIP_DEFAULT_ICON);
        expect(icon).toBeDefined();
    });

    it("renders custom display content if provided", () => {
        const customDisplay = <p>Custom Display</p>;
        const component = render(
            <DisplayTooltip display={customDisplay}>Content</DisplayTooltip>
        );

        expect(component.getByText("Custom Display")).toBeDefined();
    });
});
