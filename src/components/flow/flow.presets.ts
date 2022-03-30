import { ComponentPresets } from "@fireenjin/docs";

export default {
  default: {
    name: "Default",
    props: {
      steps: [
        {
          fields: [
            {
              name: "test",
              label: "Testing",
              labelPosition: "stacked",
              placeholder: "wee",
            },
          ],
        },
        {
          label: "Twee",
        },
      ],
    },
  },
} as ComponentPresets;
