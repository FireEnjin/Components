import { ComponentPreset } from "@fireenjin/docs/dist/types/interfaces";

export default {
  default: {
    innerHTML: () =>
      `<fireenjin-form endpoint="users" fetch filter-data="firstName,lastName" fetch-key="user"><fireenjin-input-address data-fill name="secondary" /><fireenjin-input-address data-fill name="primary" /><fireenjin-input data-fill name="firstName" /></fireenjin-form>`,
  },
} as ComponentPreset;