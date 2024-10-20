import { ComponentPresets } from "@fireenjin/docs";

export default {
  list: {
    props: {
      display: "list",
      endpoint: "listUsers",
      limit: 15,
      listEl: ({ result }) => `<h1>${result.id}</h1>`,
      collection: "users",
      results: [{ id: "001" }, { id: "002" }, { id: "003" }],
      fillScreen: true,
    },
    beforeHTML: () => "<h1>User List</h1>",
    innerHTML: (_component, props) => `
            <ion-content>
                <fireenjin-pagination fill-screen="${props?.fillScreen}" display="${props.display}" endpoint="${props.endpoint}" limit="${props.limit}" collection="${props.collection}"></fireenjin-pagination>
            </ion-content>
        `,
    hooks: {
      onComponentDidLoad: ({ organismEl, props }) => {
        if (!organismEl.querySelector("fireenjin-pagination")) return;
        organismEl.querySelector("fireenjin-pagination").listEl = props.listEl;
        organismEl.querySelector("fireenjin-pagination").results =
          props.results;
      },
    },
  },
} as ComponentPresets;
