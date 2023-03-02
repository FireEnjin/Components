import Form from "./components/form/form";
import { Item } from "./components/item/item";
import "./global.css";

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>FireEnjin - Components</title>
      </head>
      <body>
        <Form endpoint="test">
          <input name="i.am.nested.deeply.4.hi" value="woo" />
        </Form>
        <ol>
          <Item>Testing</Item>
        </ol>
      </body>
    </>
  );
};
