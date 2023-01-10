import "pollen-css";
import { Button } from "./components/button/button";
import { Form } from "./components/form/form";

import "./global.css";

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Form>
          <input name="test" value="test" />
        </Form>
        <Form>
          <input name="silent" />
        </Form>
      </body>
    </>
  );
};
