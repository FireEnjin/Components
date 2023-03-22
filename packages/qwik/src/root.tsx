import { useStore } from "@builder.io/qwik";
import Checkbox from "./components/checkbox/checkbox";
import "./global.css";

export default (props: {}) => {
  const state = useStore({
    data: ["banana", "apple", "peach", "mango"],
  });
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>FireEnjin - Components</title>
      </head>
      <body>
        {state.data || [].map((t) => <Checkbox label={t}></Checkbox>)}
      </body>
    </>
  );
};
