import { ComponentPreset } from "@fireenjin/docs/dist/types/interfaces";

export default {
  default: {
    innerHTML: () =>
      `<fireenjin-form endpoint="users" fetch filter-data="firstName,lastName" fetch-key="user" reset-button="test">
        <fireenjin-input-address data-fill name="secondary" google-maps-key="AIzaSyAz5C9TRxQ9bUkTwVaD6Yc-Iisw57UslPM"></fireenjin-input-address>
        <fireenjin-input-address data-fill name="primary" google-maps-key="AIzaSyAz5C9TRxQ9bUkTwVaD6Yc-Iisw57UslPM"></fireenjin-input-address>
        <fireenjin-input data-fill name="firstName"></fireenjin-input>
      </fireenjin-form>`,
  },
} as ComponentPreset;
