import { ComponentPreset } from "@fireenjin/docs/dist/types/interfaces";

export default {
  default: {
    innerHTML: () =>
      `<fireenjin-form fetch="findUser" filter-data="firstName,lastName" fetch-key="user"><fireenjin-input data-fill name="firstName" /></fireenjin-form>`,
  },
} as ComponentPreset;
