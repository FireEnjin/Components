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
    name: "With Options",
    props: {
      label: "With Options",
      options,
    },
  },
  withValue: {
    name: "With Value",
    props: {
      label: "Type",
      options,
      value: "important",
    },
  },
  withAdding: {
    name: "With Empty Selection",
    props: {
      allowEmptySelection: true,
      label: "Type",
      options,
    },
  },
};
