import { render, getMockContextProps } from "@stripe/ui-extension-sdk/testing";
import { ContextView } from "@stripe/ui-extension-sdk/ui";

import Hone from "./Home";

describe("DashboardHomepageView", () => {
  it("renders ContextView", () => {
    const { wrapper } = render(<App {...getMockContextProps()} />);

    expect(wrapper.find(ContextView)).toContainText("save to reload this view");
  });
});
