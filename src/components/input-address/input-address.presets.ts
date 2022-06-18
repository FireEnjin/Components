import { ComponentPresets } from "@fireenjin/docs";

export default {
  default: {
    name: "Default",
    props: {
      googleMapsKey: "AIzaSyAz5C9TRxQ9bUkTwVaD6Yc-Iisw57UslPM",
    },
  },
  multipleInputs: {
    name: "Multiple Inputs",
    innerHTML: () =>
      `<fireenjin-form><fireenjin-input-address name="primary" label="Primary Address" google-maps-key="AIzaSyAz5C9TRxQ9bUkTwVaD6Yc-Iisw57UslPM" />
      <fireenjin-input-address name="secondary" label="Secondary Address" google-maps-key="AIzaSyAz5C9TRxQ9bUkTwVaD6Yc-Iisw57UslPM" /></fireenjin-form>`,
  },
} as ComponentPresets;
