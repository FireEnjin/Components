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
      value: JSON.stringify({
        if: [
          {
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
          true,
          false,
        ],
      }),
    },
  },
} as ComponentPresets;
