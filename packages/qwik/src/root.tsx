import "pollen-css";
import { Form } from "./components/form/form";

import "./global.css";
import Input from "./components/input/input";
import Button from "./components/button/button";
import Card from "./components/card/card";

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
        <Card theme="rgba(255,255,255,0.6)">
          <Form>
            <Button theme="rgba(0,0,0,0.9)" size="large" radius="full">
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
        </Card>
      </body>
    </>
  );
};
