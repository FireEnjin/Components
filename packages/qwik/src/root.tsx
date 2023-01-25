import Form from "./components/form/form";
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
      </body>
    </>
  );
};
