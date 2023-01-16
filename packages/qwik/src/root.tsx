import "pollen-css";
import { Form } from "./components/form/form";

import "./global.css";
import Input from "./components/input/input";
import Button from "./components/button/button";

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
          <Button color="red" size="large" radius="full">
            <b>teswt</b>
            <div>Wee</div>
          </Button>
          <Input
            name="test.users.0.name"
            labelPosition="stacked"
            value="test"
          />
          <Input placeholder="wee" name="test.users.1.name" label="Testing" />
        </Form>
        <Form>
          <input value="wee" />
        </Form>
      </body>
    </>
  );
};
