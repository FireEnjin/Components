import { ComponentPresets } from "@fireenjin/docs";

export default {
  default: {
    name: "Default",
    props: {
      template: {
        html: "<p>testing {{user.firstName}}</p>",
      },
      data: {
        user: {
          firstName: "Bobby",
        },
      },
    },
  },
} as ComponentPresets;
