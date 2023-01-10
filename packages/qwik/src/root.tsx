import "pollen-css";
import { Form } from "./components/form/form";

import "./global.css";
import Input from "./components/input/input";

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body
        window:onLoad$={() =>
          document.addEventListener("fireenjinSubmit", function (event) {
            console.log(event);
          })
        }
      >
        <Form>
          <Input name="test" labelPosition="stacked" value="test" />
          <Input placeholder="wee" name="wee" label="Testing" />
        </Form>
        <Form>
          <input value="wee" />
        </Form>
      </body>
    </>
  );
};
