import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  user: {
    name: "Stencil",
  },
});

onChange("user", (value) => {
  console.log(value);
});

export default state;
