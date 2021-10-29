import { storiesOf } from "@storybook/html";
import { withKnobs, text } from "@storybook/addon-knobs";

import readme from "./readme.md";

const storyOptions = {
  notes: {
    markdown: readme,
  },
  knobs: {
    timestamps: true,
  },
};

storiesOf("Calendar", module)
  .addDecorator(withKnobs)
  .addParameters({ jest: ["calendar"] })
  .add(
    "Default",
    () => `<fireenjin-calendar></fireenjin-calendar>`,
    storyOptions
  );
