import { OrganismPresets } from "@fireenjin/docs/dist/types/interfaces";

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
} as OrganismPresets;
