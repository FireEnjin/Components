import { ComponentPresets } from "@fireenjin/docs";

export default {
  default: {
    name: "Default",
    props: {
      type: "text",
      name: "test",
    },
  },
  phone: {
    name: "Phone",
    props: {
      type: "phone",
      name: "phone",
    },
  },
  card: {
    name: "Card",
    props: {
      type: "card",
      stripeKey: "pk_test_G6ksY0dKXlgogvnitD0Wm1oc",
    },
  },
} as ComponentPresets;
