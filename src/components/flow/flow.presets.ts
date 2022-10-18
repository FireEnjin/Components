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
      endpoint: "addUser",
      steps: [
        {
          fields: [
            {
              name: "test",
              label: "Testing",
              labelPosition: "stacked",
              required: true,
              placeholder: "wee",
            },
          ],
        },
        {
          component: "fireenjin-star-rating",
          componentProps: {
            value: 4,
            required: true,
          },
        },
        {
          label: "Twee",
          fields: [
            {
              name: "test2",
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
