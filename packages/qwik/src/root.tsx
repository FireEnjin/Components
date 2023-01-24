import Button from "./components/button/button";
import "./global.css";

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
        <Button theme="green" radius="full">
          Test
        </Button>
      </body>
    </>
  );
};
