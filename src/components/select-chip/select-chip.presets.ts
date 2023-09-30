import { ComponentPresets } from "@fireenjin/docs";

const options = [
  {
    label: "User 1",
    value: 1,
    image: "https://picsum.photos/200?random=1",
  },
  {
    label: "User 2",
    value: 2,
    image: "https://picsum.photos/200?random=2",
  },
  {
    label: "User 3",
    value: 3,
    image: "https://picsum.photos/200?random=3",
  },
];

export default {
  default: {
    props: {
      icon: "person",
      label: "Select a user",
      options,
    },
  },
  multiple: {
    props: {
      icon: "person",
      label: "Select users",
      multiple: true,
      options,
    },
  },
  outline: {
    props: {
      icon: "person",
      label: "Select a user",
      outline: true,
      options,
    },
  },
} as ComponentPresets;
