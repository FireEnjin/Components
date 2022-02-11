import { OrganismPresets } from "@fireenjin/docs/dist/types/interfaces";

export default {
  default: {
    name: "Default",
    afterHTML: () => `<fireenjin-pagination id="paginator" endpoint="test" />`,
    hooks: {
      onComponentWillLoad: () => {
        const paginationEl: any = document.getElementById("#paginator");
        if (paginationEl) paginationEl.fetchData = { status: ["dry"] };
      },
    },
    props: {
      paginationEl: document.getElementById("#paginator"),
      filters: [
        {
          name: "status",
          label: "Status",
          icon: "help-circle",
          multiple: true,
          options: [
            {
              label: "Respond",
              value: "respond",
            },
            {
              label: "Evaluate",
              value: "evaluate",
            },
            {
              label: "Map",
              value: "map",
            },
            {
              label: "Dry",
              value: "dry",
            },
            {
              label: "Review",
              value: "review",
            },
            {
              label: "Complete and Get the Fuck out",
              value: "complete",
            },
            {
              label: "Lost",
              value: "lost",
            },
          ],
          value: ["dry"],
        },
      ],
      sorts: [
        {
          name: "sort",
          label: "Sort By",
          icon: "refresh",
          options: [
            {
              label: "Created At",
              value: "createdAt",
            },
            {
              label: "Name (A-Z)",
              value: "name:asc",
            },
            {
              label: "Name (Z-A)",
              value: "name:desc",
            },
          ],
          value: "createdAt",
        },
      ],
    },
  },
} as OrganismPresets;
