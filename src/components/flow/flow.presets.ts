import { ComponentPresets } from "@fireenjin/docs";
const options = [
  {
    label: "Imortant",
    value: "important",
  },
  {
    label: "Bug",
    value: "bug",
  },
  {
    label: "Idea",
    value: "idea",
  },
];
export default {
  default: {
    name: "Default",
    props: {
      askConfirmation: true,
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
          fields: [
            {
              name: "test",
              type: "radios",
              options,
              label: "Testing",
              labelPosition: "stacked",
            },
          ],
        },
      ],
    },
  },
} as ComponentPresets;
