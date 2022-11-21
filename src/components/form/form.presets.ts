import { ComponentPreset } from "@fireenjin/docs/dist/types/interfaces";

export default {
  default: {
    innerHTML: () =>
      `<fireenjin-form cache-key="wee" endpoint="users" fetch filter-data="firstName,lastName" fetch-key="user" reset-button="test">
        <fireenjin-input required name="full name" />
        <fireenjin-select id="location" required name="location" />
      </fireenjin-form>`,
  },
} as ComponentPreset;
