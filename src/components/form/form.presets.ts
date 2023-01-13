import { ComponentPreset } from "@fireenjin/docs/dist/types/interfaces";

export default {
  default: {
    innerHTML: () =>
      `<fireenjin-form cache-key="wee" endpoint="users" fetch filter-data="firstName,lastName" fetch-key="user" reset-button="test">
        <fireenjin-input required name="users[0].firstName" />
      </fireenjin-form>`,
  },
} as ComponentPreset;
