import { ComponentPresets } from "@fireenjin/docs";

export default {
  default: {
    name: "Default",
    props: {
      variables: {
        title: {
          label: "Title",
          value: "title",
        },
      },
      value: {
        and: [
          {
            "==": [
              {
                var: "title",
              },
              "test",
            ],
          },
        ],
      },
    },
  },
} as ComponentPresets;
