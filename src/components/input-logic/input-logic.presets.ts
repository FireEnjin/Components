import { ComponentPresets } from "@fireenjin/docs";

export default {
  default: {
    name: "Default d",
    props: {
      variables: {
        title: {
          label: "Title",
          description: "This is a description of the field",
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
