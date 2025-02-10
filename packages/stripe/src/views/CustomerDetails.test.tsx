import { render, getMockContextProps } from "@stripe/ui-extension-sdk/testing";
import { ContextView } from "@stripe/ui-extension-sdk/ui";

import CustomerDetails from "./CustomerDetails";

describe("CustomerDetailsView", () => {
  it("renders ContextView", () => {
    const { wrapper } = render(<App {...getMockContextProps()} />);

    expect(wrapper.find(ContextView)).toContainText("save to reload this view");
  });
});
