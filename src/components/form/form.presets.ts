import { ComponentPreset } from "@fireenjin/docs/dist/types/interfaces";

export default {
  default: {
    innerHTML: () =>
      `<fireenjin-form fetch="findUser" fetch-key="user"><fireenjin-input data-fill name="firstName" /></fireenjin-form>`,
  },
} as ComponentPreset;
