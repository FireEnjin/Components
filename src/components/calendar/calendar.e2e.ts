import { newE2EPage } from "@stencil/core/testing";

describe("fireenjin-calendar", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<fireenjin-calendar></fireenjin-calendar>");

    const element = await page.find("fireenjin-calendar");
    expect(element).toHaveClass("hydrated");
  });
});
