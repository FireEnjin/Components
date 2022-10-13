import { ComponentPresets } from "@fireenjin/docs";
export default {
  default: {
    props: {
      options: [
        {
          label: "Testing One",
          value: 1,
        },
        {
          label: "Testing Two",
          value: 2,
        },
        {
          label: "Testing Three",
          value: 3,
        },
      ],
    },
  },
  secondary: {
    props: {
      options: [
        {
          label: "Testing asdf",
          value: 1,
        },
        {
          label: "Testing fdd",
          value: 2,
        },
        {
          label: "Testing asdf",
          value: 3,
        },
      ],
    },
  },
} as ComponentPresets;
